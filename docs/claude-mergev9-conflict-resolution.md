# Merge conflict resolution: hugo_wipboehm → makecode v9.0.8

Branch: `c_universal_mergev9`. Merge commit `d4d2b83e "try"` (Merge: cbefc331 =
v9.0.8/HEAD side, ead9c525 = hugo_wipboehm side) was committed **with unresolved
conflict markers still in the tree** — 9 files. That produced the sim build
failure.

## 2026-07-27 — Notes

### Symptom
`output.txt` (stale build log) showed TS parse errors in
`sim/visuals/microbit.ts` (`TS1109 Expression expected`, `TS1005 ':' expected`).
The line/column in that log did not match the file on disk — it was stale. Fresh
`npx tsc -p sim --noEmit` pointed at `microbit.ts:2788` (`attachPinsTouchEvents`),
a cascade from an earlier structural break.

### Files that had conflict markers (all now resolved)
- `libs/core/basic.ts`, `basic.cpp`
- `libs/core/led.ts`
- `libs/core/music.ts`, `music.cpp`
- `libs/core/_locales/core-strings.json`, `core-jsdoc-strings.json`
- `libs/radio/pxt.json`, `_locales/radio-strings.json`
- `sim/visuals/microbit.ts` (structural, not marker-based)

Resolution policy: favor **hugo_wipboehm** side (Calliope branding/colors/groups,
radio→funk legacy wrapper, Calliope-specific block layouts). This matches the
merge goal "pull hugo_wipboehm state onto v9.0.8".

### microbit.ts — the real fix (`attachAccelerometerEvents`)
The conflict resolution here had grafted hugo's
`this.element.addEventListener(pointerEvents.move, ...)` opener onto HEAD's newer
method body, which declares helper closures (`startTiltDecay`, `handleMove`,
`doDecay`) at **method scope** and uses `this.bindEvent(document, ...)`. Result:
the listener callback was opened but never structurally closed → parser broke at
the next method.

Fix: replaced the whole method with **HEAD's (v9.0.8) version**, preserving the
working-tree `disableTilt` guards (comment: "Always attach event listeners; the
handlers will check `this.props.disableTilt`") in both the `move` and `leave`
handlers.

HEAD's method depends on three things the merge had dropped. Added them back:
- `private bindings: EventBinding[] = [];` field (next to `liveRegionInitialized`).
  `EventBinding` interface was already merged.
- `findParentElement()` method (walks up nested `<svg>` parents).
- `public removeEventListeners()` — iterates `this.bindings` and unbinds. Called
  from `sim/dalboard.ts:284` (`viewHost.removeEventListeners()`) on `kill()`.
  `BoardView.removeEventListeners?()` is optional in pxt-core, so tsc didn't flag
  its absence — but it's a real cleanup path. NOTE: HEAD's version also unbinds
  `this.moveHeadingOnClick`, which does NOT exist in this (hugo) codebase, so that
  line was intentionally omitted.
- `updateState()` → `updateState(initialCall: boolean = false)`: the call at
  `microbit.ts:1012` passes `true`. Kept hugo's Calliope update-call list
  (updateMotor/updateSpeaker/updateRgbLed/updateRSSI) and added HEAD's
  live-region gate (`if (!initialCall && !this.liveRegionInitialized) { ... }`).
  Did NOT add HEAD's `updateHardwareVersion()` call — that method isn't present
  here (hugo uses `domHardwareVersion` set in buildDom).

### Other resolutions worth noting
- `core-jsdoc-strings.json` "basic" description had been **duplicated** by the
  merge ("...functionality.\n\n...functionality.") — de-duplicated.
- `radio/pxt.json`: took hugo's "Legacy wrapper for Radio" → depends on `funk`,
  dropping v9.0.8's `pxt-common-packages/libs/radio` + `bluetooth.enabled=0`
  config. Intentional (radio→funk architecture).

### Verification done
- No conflict markers anywhere: `git grep -e '^<<<<<<< ' -e '^>>>>>>> ' -e '^=======$'` → none.
- All 4 JSON files `JSON.parse` OK.
- `npx tsc -p sim --noEmit` → exit 0, zero errors.
- Native/yotta target build (`pxt` CLI, `calliopemini` target) NOT run here — left
  to the user. `pxt` is on PATH at ~/.nvm/.../bin/pxt.

### Gotcha for future sessions
During this work the files were being edited live in the IDE (mtimes seconds
old); grep vs Read appeared out of sync. Always re-grep for markers on a stable
mtime before editing.
