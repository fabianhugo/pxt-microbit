# Panic display (target_panic) flicker on Calliope v1/v2 (DAL)

## 2026-07-13 — Root cause: optimised-away delay loop in microbit_panic

### Symptom
`target_panic(PANIC_VARIANT_NOT_SUPPORTED)` (code **927**) makes the whole LED
matrix flicker instead of showing a readable sad-face + error code on Calliope
mini v1/v2 (DAL builds). Raised whenever a V3/CODAL-only block is called on a
non-CODAL build: logo touch (`libs/core/logo.cpp:31,48`), sound expressions
(`soundexpressions.cpp:15`), touch mode (`touchmode.cpp:49`), music V2
(`music.cpp:61,82`), plus audio-recording / audio-samples.

### Path
`target_panic()` (`libs/core/codal.cpp:26`) → `microbit_panic(927)`. The panic
routine lives in the Calliope DAL fork `calliope-mini/microbit#v2.2.0-rc6-devhugo`
(pulled at compile time, `pxtarget.json:178`), file
`source/core/MicroBitDevice.cpp::microbit_panic`.

### Why it flickers (not a map/port issue)
- Panic and the normal display use the **same** rendering: `microbitMatrixMap`
  (`MICROBIT_DISPLAY_TYPE == MICROBIT_SB2`, `Port0`, ROW1=p13 / COL1=p4,
  `MicroBitMatrixMaps.h:149`) and identical strobe math. `MicroBit` default-
  constructs `MicroBitDisplay display;` — same map/port. So a mapping mismatch is
  ruled out (normal images render fine).
- The real cause is the per-row **delay loop** in `microbit_panic`
  (`MicroBitDevice.cpp:247`):
  ```c
  i = 2000;
  while(i>0) {
  #ifndef CALLIOPE_NO_RESET_BUTTON
      if (resetButton == 0) microbit_reset();
  #endif
      i--;
  }
  ```
  The Calliope fork defines `CALLIOPE_NO_RESET_BUTTON` unconditionally
  (`MicroBitButton.h:39`). That removes the only side-effecting statement, leaving
  `while(i>0) i--;` on a plain (non-volatile) `int` → the optimiser **eliminates
  the whole delay loop as dead code**.
- No delay ⇒ no persistence-of-vision (nothing readable) AND the 4×500 sequence
  finishes in microseconds, so `panic_timeout=4` (set by the pxt layer at
  `codal.cpp:88`) is exhausted instantly → `microbit_reset()` → program re-runs →
  re-panics → high-frequency reset loop = whole-matrix flicker.
- On a genuine micro:bit the `resetButton` GPIO read keeps the loop alive (acts
  volatile), which is why the code is readable there.

### Fix (DAL fork — MicroBitDevice.cpp)
Make the delay counter `volatile` so the loop survives when the reset-button
check is compiled out:
```c
//burn cycles (delay for POV). volatile so the loop is not optimised
//away when the reset-button check is compiled out on Calliope.
for (volatile int d = 2000; d > 0; d--) {
#ifndef CALLIOPE_NO_RESET_BUTTON
    if (resetButton == 0) microbit_reset();
#endif
}
```
Behaviour on genuine micro:bit is unchanged. 2000 was tuned assuming the GPIO
read added cost, so re-check brightness/flicker after the fix and bump the count
if the display looks dim/too fast.

### Optional follow-up (pxt layer, this repo)
Even after the DAL fix, `microbit_panic_timeout(4)` reshows 4× then resets and
re-panics (~3 s reflash). For a stable code that stays on screen, set
`microbit_panic_timeout(0)` at `libs/core/codal.cpp:88` — with timeout 0 the
`while(count)` loop never decrements and never reaches `microbit_reset()`. Note
`initCodal()` runs for BOTH variants via `initRuntime()`, so this affects v1/v2
and v3.

### Confirmation (2026-07-13)
Compiling the standalone `microbit-samples` project with `uBit.panic(020)`
flickers identically. That project has no pxt layer, so `microbit_panic_timeout`
stays at the DAL default 0 → `microbit_panic` loops forever and NEVER calls
`microbit_reset()`. So the reset-loop is ruled out; the flicker is entirely
inside the render loop = the optimised-away delay. (Note `020` is octal = 16, so
it renders `016`.) The `microbit_panic_timeout(0)` follow-up is therefore
cosmetic only; the delay-loop `volatile` fix is the actual bug fix.

### Fix confirmed + minimal form
Fix confirmed working on hardware. Minimal viable change is a single keyword on
the delay counter declaration in `microbit_panic` (the burn-cycle loop reuses
the `i` declared at the top of the `while(outerCount<500)` block):
```c
volatile int i = 0;   // was: int i = 0;
```
Applied to the fresh DAL clone at
`/home/lop/fw/samples/microbit-samples/yotta_modules/microbit-dal/source/core/MicroBitDevice.cpp:219`.

Note: the current fork source guards the reset-button check with
`#ifndef TARGET_NRF51_CALLIOPE` (an earlier copy used `CALLIOPE_NO_RESET_BUTTON`)
— same mechanism. Once merged into `calliope-mini/microbit-dal`, cut a new tag
and update `pxtarget.json:179` (`gittag`).
