# Debugging the v1 (16KB) `020` OOM crash — DAL instrumentation

Related: `claude-device-heap-size.md` (heap layout, `device_heap_size`),
`claude-panic-display.md`.

## 2026-07-20 — Symptom & diagnosis

A program that registers several button/touch event handlers, each running a
blocking display animation (`showString`/`showNumber`), crashes with panic
`020` on a Calliope mini v1 (16KB, BLE build) when the events are triggered
(especially overlapping).

### What `020` means

- `020` = `PANIC_CODAL_OOM = 20` (`built/yt/source/pxtbase.h:245`). This is the
  **DAL heap allocator** out-of-memory panic: `microbit_panic(MICROBIT_OOM)`
  raised inside `microbit_alloc()` (`MicroBitHeapAllocator.cpp`, guarded by
  `MICROBIT_PANIC_HEAP_FULL`, which is enabled in this build).
- The pxt **GC** OOM is a *different* code: `PANIC_GC_OOM = 21`
  (`pxtbase.h:246`, raised via `soft_panic` in `gc.cpp`). So `020` is the raw
  DAL heap, not the managed GC heap.

### Evidence it is the DAL heap, not the GC

On-hardware serial (`control.availableMemory()`, i.e. GC free bytes) stays flat
(~350–440 B) right up to the crash — it never collapses toward 0. So the failing
allocation is a raw DAL-heap `malloc`, not a GC allocation. Reported heap totals
on the v1: `heap0 ≈ 3272 B`, `heap1 = 1024 B`.

Note `heap1 == NON_GC_HEAP_RESERVATION (1024)`, so the GC pre-allocation in
`codal.cpp:initMicrobitGC()` (`if (device_heap_size(1) > NON_GC_HEAP_RESERVATION
+ 4) ...`) does **not** fire on v1 — condition is `1024 > 1028` → false. The GC
grows on demand from the ~3.3KB `heap0`, shared with fiber-stack spills and DAL
driver objects. There is no `heap[2]` on v1 (that is the v2-only 16KB extra
region). Prime suspect: concurrent blocking animations spill fiber stacks to
`heap0` and exhaust it.

## 2026-07-20 — DAL changes (instrumentation, TEMP)

Goal: print the exact failing allocation size + per-heap totals at the moment of
the OOM panic, over the same app UART the program already uses (115200).

All edits are marked `TEMP` for easy removal. They live in the **in-workspace
build copies** (not the `calliope-dal` checkout), applied identically to all
three bundled projects so any of them can produce the base image:

- `libs/blocksprj/…`, `libs/tsprj/…`, `libs/bluetoothprj/…`
  `/built/yt/yotta_modules/microbit-dal/source/core/MicroBitHeapAllocator.cpp`

### Change 1 — call a report hook before the OOM panic

In `microbit_alloc()`, immediately before `microbit_panic(MICROBIT_OOM)`:

```c
extern "C" void pxtOOMReport(uint32_t, uint32_t, uint32_t, uint32_t, uint32_t);
...
#if CONFIG_ENABLED(MICROBIT_PANIC_HEAP_FULL)
    pxtOOMReport((uint32_t)size,
                 device_heap_size(0), device_heap_size(1), device_heap_size(2),
                 (uint32_t)heap_count);
    microbit_panic(MICROBIT_OOM);
#endif
```

`device_heap_size`, the global `heap[]` and `heap_count` are all in this TU.

### Change 2 — the report hook lives in pxt `codal.cpp`

Added `pxtOOMReport()` to **all four** copies of `codal.cpp`
(`libs/core/codal.cpp` source + the three `…/built/yt/source/core/codal.cpp`
copies), inserted right after `debuglog()`:

```c
#if !MICROBIT_CODAL
extern "C" void pxtOOMReport(uint32_t sz, uint32_t h0, uint32_t h1,
                             uint32_t h2, uint32_t nh) {
    // manual formatting (no heap), then a SYNC_SPINWAIT flush
    ...
    uBit.serial.send((uint8_t *)buf, n, SYNC_SPINWAIT);
}
#endif
```

Output line, emitted right before the `020` scroll:

```
OOM sz=<failing bytes> h0=<heap0> h1=<heap1> h2=<heap2> nh=<heap count>
```

### Why this design

- **`SYNC_SPINWAIT`, not the default.** The DAL default serial mode is
  `SYNC_SLEEP` (`MicroBitConfig.h:450`), which blocks by yielding to the fiber
  scheduler. From the OOM path (likely already inside the scheduler during a
  fiber-stack spill, and immediately followed by `microbit_panic` disabling
  IRQs) a sleep-based send never flushes — the message is lost. This is why an
  earlier attempt using `pxt::debuglog` (default mode) produced no output even
  though the code was compiled in. `SYNC_SPINWAIT` busy-waits on the UART: no
  scheduler, no allocation, guaranteed delivery before the panic/reset.
- **Hook in `codal.cpp`, not inline in the DAL.** `codal.cpp` has `uBit`, the
  serial API and `SYNC_SPINWAIT` in scope; the DAL allocator TU does not
  reliably include them. The DAL just carries an `extern "C"` forward decl.
- **`#if !MICROBIT_CODAL` guard.** `codal.cpp` is shared with the v3/CODAL
  build, where the serial class/enum differ. The hook is DAL(v1/v2)-only; on v3
  the DAL allocator that would call it does not exist either, so no undefined
  reference.
- **`extern "C"` inside `namespace pxt`** still emits the unmangled symbol
  `pxtOOMReport`; verified with `nm` (`T pxtOOMReport` in codal.o, matching
  `U pxtOOMReport` in the allocator).

### Verification

- Both changed files compile with the production DAL flags
  (`arm-none-eabi-g++ 10.3`, `-fsyntax-only`, flags from the blocksprj
  `bbc-microbit-classic-gcc` build) — only pre-existing BLE-header warnings.
- Symbol linkage confirmed via `nm` (see above).
- Not yet observed firing on hardware (pending user's next flash).

## 2026-07-20 — Build/cache note (how to rebuild without wiping DAL edits)

pxt keys the compiled firmware on `built/hexcache/<sha>.hex`, where `sha`
hashes the **pxt-generated `source/`**, *not* `yotta_modules/`. So editing the
DAL under `yotta_modules/` does not invalidate the cache — pxt keeps serving the
cached base hex and never re-runs the native build. Removing `built/yt/build/`
does not help (pxt short-circuits on the hexcache before invoking ninja); a
running `pxt serve` also caches in memory and only watches TS sources.

To force a native rebuild while **keeping** the DAL edits (i.e. without
`pxt clean`, which re-extracts `yotta_modules` from the pinned gittag and wipes
them):

1. `rm -rf built/hexcache/*` (the real gate), and optionally
   `rm libs/*/built/yt/buildcache.json`.
2. Restart the `pxt serve` process.
3. Keep `yotta_modules/` and `built/yt/build/` (ninja recompiles just the edited
   files by mtime — fast).

Editing `libs/core/codal.cpp` (Change 2) changes the generated-source `sha`
directly, so it **auto-invalidates** the hexcache — the next build is fresh with
no manual cache clearing needed.
