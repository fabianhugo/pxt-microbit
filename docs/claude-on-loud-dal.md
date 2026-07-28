# "on loud" sound event on Calliope mini v1/v2 (DAL)

## 2026-07-13 — Investigation: default threshold + missed-event cause

Context: commit 673ca895 enabled the `on loud/quiet sound` block for mini v1/v2
(DAL) via a fiber-based watcher in `libs/microphone/microphone.cpp`. Events are
not always detected on hardware (esp. claps).

### Findings

- **Default thresholds (DAL path)**: `loudThreshold = 64`, `quietThreshold = 40`
  (`libs/microphone/microphone.cpp:46-47`). The `set sound threshold` block UI
  default is 128 (`threshold.defl=128`), which is near-unreachable on this
  scale — claps were measured at 60–120 (see comment in the file).
- **Scale**: DAL path reports peak-to-peak ADC range / 4 (0..255), sampled by
  `readSoundLevelDal()` — same approach as official pxt-calliope `soundLevel()`.
- **CODAL comparison (mini v3)**: `uBit.audio.levelSPL` is created with
  85 dB high / 65 dB low (codal-microbit-v2 `MicroBitAudio.cpp:88`); with the
  8-bit unit mapping (35 dB→0, 100 dB→255, `LevelDetectorSPL.h`) that is
  ≈196 loud / ≈118 quiet on the 0–255 scale. Completely different pipeline
  (continuous audio-stream SPL), so the two scales are not comparable.
- **DAL has no level detector**: `LevelDetector`/`LevelDetectorSPL` exist only
  in codal-core. microbit-dal (incl. Calliope variant) has nothing; official
  pxt-calliope compiles `onSound` only under `#if MICROBIT_CODAL` and offers
  only polling `soundLevel()` on v1/v2. So implementing the event in the
  MakeCode C++ package (this fork's approach) is the only sensible place —
  confirmed preferable, no DAL fork change needed.

### Timing analysis — timing is very likely the dominant cause

- `readSoundLevelDal()` takes 32 *instantaneous* ADC point samples with
  `uBit.sleep(5)` between them. DAL scheduler tick is 6 ms
  (`SYSTEM_TICK_PERIOD_MS = 6`, microbit-dal `MicroBitConfig.h:149`), so sleep
  rounds up → ~6 ms spacing → effective sampling ≈167 Hz over a ~190 ms window.
- A clap's energy burst lasts ~5–20 ms with kHz-range content. Only 1–3 of the
  32 samples land inside the burst, each at a random phase of a kHz
  oscillation (can hit near a zero crossing). To reach level 64 the window
  needs max−min ≥ 256 ADC counts. Sparse point-sampling therefore
  *systematically underestimates* short transients → claps randomly read
  below 64 even when "loud". Sustained sounds (shouting) are detected fine.
- Threshold interacts with this: 64 sits at the very bottom of the measured
  clap band (60–120), so any under-sampled clap drops below it.
- Secondary effects: detection is evaluated only once per ~190 ms window
  (worst-case latency >200 ms, more under fiber load); hysteresis requires
  level ≤ 40 before the next Loud can fire, so steady background noise in the
  40–63 band blocks repeat events, and two claps <~400 ms apart yield one event.

### Possible fix direction (not yet implemented)

Sample in a dense burst instead of spaced points: tight loop of a few hundred
`getAnalogValue()` reads with no sleep (each read is tens of µs on nRF51 →
~10–20 ms of near-continuous coverage), then `uBit.sleep(20–50)` to yield.
This raises clap-capture probability dramatically and cuts latency. Re-measure
the clap band afterwards — dense sampling will read claps *higher*, so 64 may
then be safely raised or kept. Note `soundLevel()` shares
`readSoundLevelDal()`, so its block timing would change from ~190 ms to
~30–70 ms per call (an improvement, but re-test programs that poll it).

## 2026-07-13 — Decision analysis: best fix for missed events

Quantified the root cause: 32 point samples × ~68 µs ADC conversion ≈ 2 ms of
actual listening per ~192 ms window — the mic is heard only **~1% of the
time**. Threshold tuning cannot fix a 99% blind detector; sampling structure
is the primary fix.

Options considered:

1. **Burst + sleep** (e.g. 20 ms tight sampling, 30 ms `uBit.sleep`): simple,
   low power impact, but duty ≈ 40–60% — a 10 ms clap still misses ~40% of
   the time. Better, not good.
2. **Near-continuous with `schedule()` yields** *(recommended)*: sample in
   ~2–3 ms sub-bursts, update a peak-to-peak envelope, call `schedule()`
   (public in `MicroBitFiber.h:201`) between sub-bursts. The fiber stays
   runnable, so mic coverage approaches 100% of idle CPU while other fibers
   still run whenever they're runnable. Detection becomes reliable and
   latency drops to ~tens of ms.
3. **Timer/ISR-driven sampling (~1 kHz)**: deterministically correct, but
   nRF51 timers are scarce (softdevice reserves TIMER0, DAL uses the system
   ticker), ISR budget ~7% CPU, and BLE-coexistence risk. Complexity not
   justified at this quality bar.
4. **Implement in the DAL fork**: no functional gain over the package-level
   fiber (DAL fibers are the same mechanism), but adds a fork of a dead
   upstream to the build/maintenance surface. Rejected — package-level
   (current approach) confirmed correct even ignoring preference.

Side effects of option 2 (accepted / to mitigate):

- **Power**: the fiber never sleeps → no WFI idle; extra ~few mA while an
  `on sound` handler is registered. Mitigation if needed: insert
  `uBit.sleep(5)` every ~50 ms of sampling (~90% duty, most power back).
- **Fiber latency**: cooperative scheduler → other fibers wait out the
  current sub-burst; keep sub-bursts ≤2–3 ms to bound jitter.
- **Degradation under CPU-heavy programs**: a user busy-loop starves the
  watcher (cooperative scheduling) — inherent to any fiber approach.
- **Calibration reset**: dense sampling reads transients *higher*; the
  measured clap band (60–120) and defaults (64/40) must be re-measured on
  hardware.
- **`soundLevel()` coupling**: if the block reuses the new sampler it returns
  in ~20 ms instead of ~190 ms and reads higher — programs that used it as an
  implicit delay or calibrated against old values change behavior. Preferably
  serve the block from the watcher's envelope when the fiber runs.
- **Hysteresis kept as-is** (loud re-arms only after level ≤ quiet threshold)
  to match CODAL/v3 semantics; document that steady 40–63 background noise
  blocks repeat loud events — that's a threshold-tuning issue, not timing.
- **ADC sharing**: heavier ADC use slightly delays other analog reads
  (correctness unaffected; conversions are synchronous).

## 2026-07-13 — Implemented option 2 in libs/microphone/microphone.cpp

- `sampleSubBurst()`: 32 back-to-back `getAnalogValue()` reads (~2 ms).
- `measureSoundLevelDal()`: 12 sub-bursts (~27 ms of listening) with
  `schedule()` yields in between; returns p-p range / 4 (0..255).
- `micWatcher()`: evaluates thresholds every cycle, caches `lastSoundLevel`,
  then `uBit.sleep(5)` — the sleep is load-bearing: a fiber that only calls
  `schedule()` never leaves the run queue and would starve the DAL **idle
  fiber**, which services idle components (accelerometer polling etc.).
  Resulting mic duty ≈ 85% (vs ~1% before), evaluation every ~33 ms.
- `soundLevel()` block: served from the watcher's cached level when the fiber
  runs (≤ ~33 ms stale); otherwise a one-shot dense measurement + one sleep
  tick (call time drops from ~190 ms to ~33 ms and transients read higher —
  behavior change for programs that used it as an implicit delay).
- Thresholds/hysteresis unchanged (64/40); signatures unchanged, so no
  shims.d.ts regen needed.
- Verified: compiles clean with the production flags (arm-none-eabi-g++
  10.3, `-fsyntax-only`, flags extracted from the blocksprj yotta
  build.ninja); only pre-existing BLE-header warnings.
- **TODO (hardware)**: re-measure quiet-room / clap levels on v1 and v2 —
  dense sampling reads transients higher, so 64/40 may want raising; test
  repeated claps (hysteresis re-arm) and battery current with an
  `on loud sound` handler active.

## 2026-07-13 — Regression: display stutter/flicker (~every 3 s) → reworked duty cycle

User report: detection much better, but a program with touch/button/sound
handlers + forever loop flickers the display every ~3 s on hardware.

Root cause (the part I got wrong in the first version): I treated the DAL
idle fiber as "accelerometer polling and friends" and gave it one 6 ms slot
per ~33 ms cycle. But in microbit-dal the idle fiber — which runs ONLY when
the run queue is empty (`MicroBitFiber.cpp: idle()/idle_task()`) — is also
what drains the **deferred MessageBus queue**. That queue carries every
`registerWithDal` event handler (buttons, touch, on-loud) AND the display
animation-completion events that `showLeds`/`showString`/`showAnimation`
block on. A watcher fiber that stays runnable ~90% of the time makes all
deferred event delivery run in starved bursts → visible display stutter and
laggy handlers. (Display *row strobing* itself is interrupt-driven and
immune; it's the fiber-level animation/event machinery that suffered. The
exact 3 s periodicity was never fully explained — likely a beat between the
watcher cycle and the program's animation timing.)

Fix: sleep one scheduler tick after **every** sub-burst instead of once per
12-burst cycle. Each 6 ms tick period is now ~2.5 ms sampling + ~3.5 ms
idle: the run queue empties every tick, so event delivery behaves as if the
watcher weren't there. Duty ≈ 40% (still ~40× the old 1%), worst inter-burst
gap ~3.5 ms (shorter than any audible transient, so claps still guaranteed
to overlap a burst), evaluation window 12 bursts ≈ 72 ms, loud-event latency
≤ ~80 ms. `schedule()` no longer used. Verified with the same
arm-none-eabi-g++ -fsyntax-only setup.

Lesson recorded: on DAL, any long-lived background fiber must sleep at least
one tick per ~6 ms period — yielding via `schedule()` is NOT enough, because
only an empty run queue lets deferred event delivery happen.

## 2026-07-13 — Flicker persisted; real suspect: compass.ts top-level allocations

The duty-cycle rework did NOT fix the ~3 s whole-matrix flash (all LEDs flash
except a few that stay dark; USB power, normal brightness; display otherwise
blank). New facts from hardware bisecting (by Hugo):

- Flash only occurs when `onSound` is in the program.
- A separate startup crash exists WITHOUT `onSound`: 6 registered handlers
  (touch P1/P2/P3, buttons A/B, shake) → no serial output at all, on-start
  never runs. Good at a8bca0ac, broken at 673ca895 (same DAL gittag
  `calliope-mini/microbit#v2.2.0-rc6-devhugo` both sides, so the DAL fork is
  not the variable).
- Standalone DAL repro (`/home/lop/fw/makecode/calliope-dal-repro/`, same DAL
  version, same watcher code + handlers): NO flash, NO crash → both issues
  live in the MakeCode layer, not the DAL.
- Audit of 673ca895: pins.cpp/input.cpp/basic.cpp changes are block-annotation
  churn only. The one real addition to every compiled program:
  **libs/core/compass.ts**, with TOP-LEVEL `const` allocations — 16×
  `images.createImage(...)` + 2 concat arrays — which execute at every
  program start. On nRF51 (16 KB RAM, softdevice + DAL + fibers + pxt GC
  heap) that is a significant startup bite; more handlers → more closures →
  OOM at startup. compass.ts is the only shipped lib file with top-level
  allocations (checked).

Test in progress: removed `"compass.ts"` from libs/core/pxt.json `files`,
restored the dense-sampler microphone.cpp (git checkout had reverted the
uncommitted version). If confirmed, proper fix = keep the block but build the
image arrays lazily inside a cached function.

Note-to-self correction: the earlier idle-starvation explanation for the
flash was wrong (display strobing is IRQ-driven and the flash survived the
duty-cycle fix). The per-sub-burst sleep is still the right design for event
latency, but the flash root cause is elsewhere — likely memory pressure.

## 2026-07-13 — compass.ts removal confirmed; handler ceiling remains → memory config

Results after removing compass.ts from the build: 6-handler program boots
fine. But: 6 handlers + onSound crashes (5 + onSound works), 8 handlers
without sound crashes. Live pxt-calliope on a v1 handles 9+. Baseline: we
assume 16 KB RAM (v1+v2 served by one build).

Root cause of the lower ceiling vs live: this fork inherited micro:bit's
yotta memory config; live pxt-calliope (libs/core/pxt.json) runs leaner:
`panic_on_heap_full: 0` (DAL malloc returns NULL so the pxt GC can collect
and retry instead of instant panic 020 — likely the main lever),
`stack_size: 1280` (vs 2048 default), `gatt_table_size: 0x600`,
`event_service: 0`, no eddystone. Applied all of these to our
libs/core/pxt.json optionalConfig (kept whitelist/security_level and the
pairing userConfigs).

Caveat: `panic_on_heap_full: 0` changes the failure mode — DAL-internal
allocations that don't check NULL could hard-fault instead of showing panic
020. Accepted because live calliope ships exactly this on the same DAL.

Verification: after rebuild, built/yt/config.json must show the new keys
(config change should trigger a native rebuild; if not, delete built/).
Then re-test the ceiling: 6 handlers + onSound, 8 and 9+ without sound.

## 2026-07-13 — Flicker mechanism solved; diagnostic config for the ceiling

Result of the lean config: flicker GONE, ceiling moved up slightly, but a
9-block program (7 handlers + onSound + everyInterval) now dies with a BLACK
screen (no sad face, no serial, on-start never runs).

Two insights:
- `initCodal()` in libs/core/codal.cpp calls `microbit_panic_timeout(4)`:
  panics repeat the error display 4× then RESET the board. So the old ~3 s
  "flicker" was a panic→reboot loop of a marginal-OOM program (the stable
  dark pixels = off-pixels of the sad-face/digit glyphs). Fits: freeing
  memory (compass.ts fix) removed it.
- My bundled config likely converted clean panics into silent hard faults:
  `panic_on_heap_full: 0` makes DAL mallocs return NULL, and DAL-internal
  callers (fiber stack growth in verify_stack_size etc.) don't null-check;
  `stack_size: 1280` is proven only on pxt-calliope's OLDER pxt runtime —
  this fork's newer pxt-core startup may need more MSP headroom.

→ Diagnostic config now in libs/core/pxt.json: stack_size 2048,
panic_on_heap_full 1 (visible sad-face + error code), keeping the real
savings (gatt_table_size 0x600, event_service 0, eddystone off).
Panic code map: 020 = DAL heap full, 021 = pxt GC OOM, 022 = GC alloc too
big. If the 9-block program STILL dies silently with this config, the cause
is stack/other, not heap.

RAM cost of onSound in MakeCode vs hypothetical DAL implementation:
watcher fiber (TCB ~120 B + saved stack a few hundred B) + 2 listeners
≈ 0.5–0.8 KB total vs ~0.1 KB for a DAL systemTick component. Real but
secondary; a plain handler registration is only ~60 B (MicroBitListener
~28 B DAL-side + closure + GC root pxt-side), so an 8-handler ceiling means
baseline free memory is near zero regardless.

Measurement tool (works in any program that boots): control.gc() +
control.gcStats() printed over serial — use to price constructs by diffing
N vs N+1 handlers, with/without onSound.
