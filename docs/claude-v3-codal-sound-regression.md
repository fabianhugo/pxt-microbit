# V3 (CODAL) sound regression — codal library-version lens

## 2026-07-27 — Investigation of no-sound on Calliope mini V3 (CODAL)

Bug: whole music/sound category silent on V3 (MICROBIT_CODAL=1), works on V1 (DAL).
Appeared after merge d4d2b83e (merged hugo ead9c525 into makecode v9.0.8 cbefc331).

### Codal target pin history (pxtarget.json, mbcodal.compileService.codalTarget)
- stock micro:bit v9.0.8 (cbefc331): `lancaster-university/codal-microbit-v2` @ `v0.3.5`
- hugo side, first step: `calliope-edu/codal-microbit-v2` @ `v0.3.5-calliope_experimental`
- commit 8ac0251c ("uses up to date codal with melody bug fix"): -> `calliope-edu/codal-microbit-v2` @ `v0.3.5_calliope_universal`
- HEAD (d4d2b83e): SAME as hugo — `calliope-edu/codal-microbit-v2` @ `v0.3.5_calliope_universal`

`git diff ead9c525 HEAD -- pxtarget.json` on the codalTarget block = EMPTY (identical).
So the merge did NOT change the codal version. The codal swap came entirely from the
hugo branch (8ac0251c). The regression-vs-shipped-v9.0.8 is the Lancaster->Calliope-fork swap.

### Key point: the built codal branch is a MOVING BRANCH, not a pinned tag/SHA
`branch: v0.3.5_calliope_universal` — no SHA/githash lock file in the repo
(`git ls-files | grep -iE 'lock|githash'` finds nothing relevant). The actual codal
source compiled into the V3 firmware is whatever that fork branch points at, and is
NOT visible in this repo's history.

### Local audio C++ is unchanged from stock (all rule-outs confirmed)
- music.cpp cbefc331->HEAD: only group-label strings + one removed `enabled.label`.
- pins.cpp ead9c525->HEAD (the "176 lines"): 100% `//% x.label="..."` block-annotation
  additions. Zero functional C++ change. analogPitch CODAL branch
  (pitchPin=&uBit.audio.virtualOutputPin; pinAnalogSetPitch) unchanged (pins.cpp:705-734).
- dal.d.ts ead9c525->HEAD: identical. vs stock: only pin/motor IDs added (P17/P18/RGB/motor),
  NO audio/mixer/samplerate/speaker constant changes (mixer block dal.d.ts:792-799 untouched).
- CODAL sound entry points all delegate to codal lib unchanged:
  - soundexpressions.cpp:11  uBit.audio.soundExpressions.play/playAsync
  - music.cpp:23 setVolume, :58 setSpeakerEnabled, :98 mixer.setSilenceLevel
  - pins.cpp:985 setAudioPin -> uBit.audio.setPin, :986/:1004 setPinEnabled

### Conclusion (this lens)
Since every local audio C++ path is byte-for-byte the stock v9.0.8 code (which produces
sound on genuine micro:bit V2 CODAL builds), and the ONLY audio-relevant change is the
whole codal library being swapped to the un-pinned Calliope fork branch
`calliope-edu/codal-microbit-v2 @ v0.3.5_calliope_universal`, the silence lives in the
codal fork branch (speaker/mixer/soundpin init or the V3 hardware pin mapping in that
fork), NOT in this pxt-microbit repo.

The merge d4d2b83e is a red herring for THIS lens: it inherited the codal swap wholesale
from the hugo branch (8ac0251c) and made no audio/codal config change of its own.

## 2026-07-27 — Four-lens synthesis (final diagnosis)

Actual HEAD is **1ba91b54** ("fix merge problems"), one commit past the d4d2b83e in the
task framing; its mbcodal config is byte-identical to ead9c525, so nothing below changes.

All four investigation lenses converge UNANIMOUSLY:
1. `git diff ead9c525 HEAD -- libs/core/pins.cpp` filtered of `.label=` lines = EMPTY.
   Zero functional C++ change. music.cpp non-label diff = EMPTY. Verified this session.
2. `codalTarget` block ead9c525 vs HEAD = IDENTICAL (calliope-edu/codal-microbit-v2 @
   branch v0.3.5_calliope_universal). The merge changed no compile config.
3. analogPitch CODAL branch identical hugo->HEAD: pins.cpp:709 `pitchPin =
   &uBit.audio.virtualOutputPin`. V1/DAL branch is a separate Calliope DRV8837 motor-pin
   route (MOTOR_IN1/IN2), also identical hugo->HEAD.
4. No boot-time speaker enable anywhere in bundled TS; edgeConnectorSoundDisabled=false.

**Mechanism confirmed from a local codal checkout** (micropython-calliope-mini-v3 copy of
codal-microbit-v2, source/MicroBitAudio.cpp): the physical speaker is driven by
`setSpeakerEnabled(true)` -> `pwm->connectPin(speaker, 1)` where `speaker` is an
NRF52Pin& passed INTO the MicroBitAudio constructor (MicroBitAudio.cpp:38, .h:88) by the
BOARD MODEL (microbit-v2-samples / MicroBitDevice layer), not by this repo. speakerEnabled
defaults true (line 41). So on a correct V3 board model, `analogPitch` on virtualOutputPin
DOES reach the speaker with no explicit enable from pxt.

User memory (calliope-v1v2-shared-drv8837): "v3 (CODAL) has a separate dual H-bridge and is
unaffected" — i.e. V3's speaker is genuinely a separate micro:bit-style device, so the stock
virtualOutputPin route is the CORRECT design for V3. The failure is that this route's
speaker pin / enable is not wired for the Calliope V3 board in the fork branch.

**ROOT CAUSE (high confidence): the defect is NOT in this repo.** It lives in
calliope-edu/codal-microbit-v2 @ v0.3.5_calliope_universal — either (a) the V3 board model
constructs MicroBitAudio with a speaker pin that isn't the Calliope V3 loudspeaker pin
(prime suspect given the branch name is a pin-rename/"universal" pin-update), or (b) the
fork defaults speaker disabled / mixer output off for the V3 board, or (c) the moving branch
tip regressed audio with no visible change here. The "appeared after merge" is timing only:
the merge (from hugo 8ac0251c, 2026-06-17) was the first shippable target combining the
Lancaster->Calliope-fork codal swap; V3 was already silent on hugo_wipboehm pre-merge.

**Single confirming check:** resolve the tip SHA of v0.3.5_calliope_universal and read the
V3 board model's `new MicroBitAudio(...)` call (in microbit-v2-samples / MicroBitDevice) to
see which pin is passed as the `speaker` argument, and compare the fork's V3 speaker-pin
define against the actual Calliope V3 hardware speaker pin. That one read confirms/refutes
the mis-wired-speaker-pin hypothesis. A hardware A/B (flash a known micro:bit-V2 codal build
value of the speaker pin) would confirm empirically.

**Fix location:** in the codal fork, not this repo. Then PIN codalTarget to a known-good SHA
in pxtarget.json:201-206 (currently an unpinned moving branch, no lock file) for
reproducibility. No change to libs/core is warranted.

**Risk to V1/V2:** none from the fix, since V1/V2 use the independent DRV8837 MOTOR_IN1/IN2
DAL route (pins.cpp #else branch), untouched by any codal-fork speaker-pin correction.

### Next steps to confirm (outside this repo)
1. Resolve the current SHA of `calliope-edu/codal-microbit-v2 @ v0.3.5_calliope_universal`
   and diff its audio/ (Mixer2, Synthesizer, SoundExpressions, NRF52PWM, MicroBitAudio)
   + the V3 MicroBitIO/board pin map vs `lancaster-university/codal-microbit-v2 @ v0.3.5`.
2. Suspect specifics: V3 speaker pin not enabled by default / virtualOutputPin routed to a
   pin not wired to the V3 speaker / mixer default output disabled / A0/A1 pin rename in the
   "pin-update" codal accidentally moved the speaker pin.
3. Because the branch is un-pinned, a fork-side commit could have changed behavior with NO
   change in this repo — pin the codalTarget to a known-good SHA to make builds reproducible.
