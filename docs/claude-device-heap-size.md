# Exposing DAL `device_heap_size()` to MakeCode

## 2026-07-16 — Added `control.deviceHeapSize(heapIndex?)`

Goal: let MakeCode programs read the DAL/CODAL runtime heap size via the
`device_heap_size(uint8_t heap_index)` function from the heap allocator.

### Findings

- `device_heap_size` is declared identically at **global scope** in both
  microbit-dal (`MicroBitHeapAllocator.h:96`) and codal-core
  (`CodalHeapAllocator.h:91`), so a single un-namespaced forward declaration
  links on v1/v2 (DAL) and v3 (CODAL) alike. `libs/core/codal.cpp:44` already
  forward-declares and uses it unconditionally (for the GC pre-allocation), so
  the pattern is proven.
- Semantics: returns the **total** size in bytes of heap `heap_index`
  (`heap_end - heap_start`), or `0` if that heap doesn't exist. It is *not*
  free/available memory. On the DAL path heap 0 is the main heap; heap 1 is the
  SD-reused region the pxt GC pre-allocates from.
- Mirrored the existing `control.ramSize()` inline-shim pattern
  (`_ramSize` in `control.cpp` + a `//% shim=control::_ramSize` TS function with
  a simulator-fallback body). Functions using this pattern are **not** listed in
  `shims.d.ts` — the native binding is generated from the C++ `//%` annotation at
  build time, and the simulator runs the TS body. So no `shims.d.ts` regen.

### Implementation

- `libs/core/control.cpp`: forward-declares `device_heap_size`; adds
  `uint32_t _deviceHeapSize(int heapIndex)` → `device_heap_size((uint8_t)heapIndex)`.
- `libs/core/control.ts`: adds `export function deviceHeapSize(heapIndex = 0)`
  with `//% shim=control::_deviceHeapSize`; simulator body returns `0` (no DAL
  heap in the sim).

### Verification

- Compiles clean with the production DAL flags (arm-none-eabi-g++ 10.3,
  `-fsyntax-only`, FLAGS/INCLUDES from the blocksprj bbc-microbit-classic-gcc
  `build.ninja`) — only pre-existing BLE-header warnings.
- Not yet exercised on hardware or in a full pxt build.

## 2026-07-16 — "Available memory": no DAL call exists → GC-based helper

The DAL/CODAL heap allocator exposes **no** free/available-memory function —
only `device_heap_size` (total) plus `microbit_alloc/free/realloc` and
`microbit_heap_print()` (prints free blocks over serial, returns void). The
internal `heap[]` free-list metadata is `static` in
`MicroBitHeapAllocator.cpp`, so free bytes can't be summed from outside without
forking the DAL.

The meaningful "available memory" for a MakeCode program is the **pxt GC**
free space (user objects allocate from the GC-managed block that
`codal.cpp:initMicrobitGC()` pre-allocates from the DAL heap). pxt already
tracks this: `control.gcStats()` (from common-packages `base/gcstats.ts`,
included in `libs/core/pxt.json`) returns `lastFreeBytes` / `minFreeBytes`,
updated on every GC; `control.gc()` (`shim=control::gc`, `controlgc.cpp`) forces
a collection.

Added `control.availableMemory()` in `libs/core/control.ts` (pure TS, no new
C++): forces a `gc()` then returns `gcStats().lastFreeBytes` (0 in the
simulator, where `getGCStats()` returns null). Note this is GC-heap free, NOT
raw DAL-heap free — documented in the jsdoc and paired with `deviceHeapSize`
(total DAL heap) as the two complementary numbers.

## 2026-07-16 — Is the v2 32KB extra-heap system active in pxt? YES

Question: the DAL fork adds a system that creates more heap on Calliope mini v2
(32KB) while v1 (16KB) is unchanged — is it active in the pxt build?

Answer: **yes, it's compiled in and runs at every boot.** Chain:

- `microbit/source/MicroBit.cpp:199-204` (in `MicroBit::init()`): if
  `microbit_ram_size() > 16*1024` it powers on nRF51 RAM banks 2-3 via
  `NRF_POWER->RAMONB` (banks 0-1 use `RAMON`; the GCC startup
  `startup_NRF51822.S` only sets `RAMON`, so the upper banks are OFF until this
  runs) and calls `microbit_create_heap(MICROBIT_SRAM_END,
  MICROBIT_SRAM_END + 16*1024)` — i.e. 0x20004000..0x20008000, an extra heap
  region. On 16KB v1, `microbit_ram_size()` (reads FICR
  `NUMRAMBLOCK * SIZERAMBLOCKS`, `MicroBitDevice.cpp:85`) is ≤16KB → no-op.
- `MicroBit::init()` is called from pxt's `initMicrobitGC()`
  (`libs/core/codal.cpp:59`, `uBit.init()`), which runs at program startup.
- Confirmed linked into the firmware: `microbit_ram_size()` appears in
  `built/yt/build/bbc-microbit-classic-gcc/source/pxt-microbit-app.map`.

Notes:
- The single 16KB linker map (`MICROBIT_SRAM_END = 0x20004000`, config caps at
  16KB) is shared by v1 and v2; the extra 16KB on v2 is reclaimed purely at
  runtime by registering it as an additional heap — nothing is placed there by
  the linker.
- Because it's registered via `microbit_create_heap`, the new
  `control.deviceHeapSize()` block can observe it on hardware: on v2 an extra
  heap index reports ~16KB that is absent on v1. Good way to verify the feature
  on-device.
- This lives in the pinned DAL fork (yotta_modules, gittag
  `calliope-mini/microbit#v2.2.0-rc6-devhugo`), so it ships with every build of
  this fork.

## 2026-07-16 — Hardware readings on a v2, and why ramSize()==16384

User ran on a mini v2: `ramSize=16384`, `availableMemory=196`,
`deviceHeapSize()=3272`.

- **`ramSize()` returns 16384 on BOTH v1 and v2 — by design, not a bug.**
  `control::_ramSize()` = `(uint32_t)&__StackTop & 0x1fffffff`. `__StackTop`
  is the linker's stack top = `CORTEX_M0_STACK_BASE` = `MICROBIT_SRAM_END` =
  `0x20004000` → `0x4000` = 16384. The linker map is fixed to 16KB and shared
  by v1/v2 (`MicroBitConfig.h:47`). The extra 16KB on v2 lives ABOVE
  `0x20004000` and is added at runtime as a separate heap — invisible to the
  `__StackTop` symbol. So `ramSize()` never reflects the v2's physical 32KB.

- **To read actual physical RAM: use the FICR.** `microbit_ram_size()`
  (`MicroBitDevice.cpp:85` = `NUMRAMBLOCK * SIZERAMBLOCKS`) returns 16384 on
  v1, 32768 on v2. Wired up as `control.physicalRamSize()` (C++
  `_physicalRamSize` in control.cpp; `#if MICROBIT_CODAL` returns 128*1024 for
  v3, else `microbit_ram_size()`). This is the correct "how much RAM" call.

- **`deviceHeapSize()` (== index 0) returns only heap[0].** Heap layout on v2
  (BLE build), from the `microbit_create_heap` order in
  `microbit/source/MicroBit.cpp`:
  - heap[0]: main heap `__end__..MICROBIT_HEAP_END` (created on first malloc) —
    this is the 3272 the user saw.
  - heap[1]: SoftDevice-reuse region (GATT-table path, line 177), small
    (~hundreds of bytes to ~a few KB depending on `gatt_table_size`). The pxt
    GC pre-allocates from THIS heap (`codal.cpp:60`, `device_heap_size(1)`).
  - heap[2]: the extra 16KB on v2 (line 203) = `0x20004000..0x20008000` =
    16384 bytes. **Present only on v2.**
  So on v2, `control.deviceHeapSize(2)` ≈ 16384 (and `(2)` == 0 on v1). Sum
  indices 0..2 for total device heap.

- **`availableMemory()` == 196 is GC-free, and does NOT include heap[2].** The
  GC block is pre-allocated only from heap[1] (`codal.cpp`), so the v2 extra
  16KB is not in the initial managed heap; the GC can still pull further blocks
  from any heap via `microbit_alloc` on demand, but `lastFreeBytes` only
  measures free space in the GC's current blocks. Net: the extra 32KB benefits
  DAL/C++ allocations and GC growth headroom, but doesn't show up as a bigger
  `availableMemory()` reading at rest.
