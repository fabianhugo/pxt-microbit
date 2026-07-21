# Template projects (`libs/*prj`) and default build config

## Notes

### What the `*prj` folders are (2026-07-21)
- `libs/blocksprj`, `libs/tsprj`, `libs/bluetoothprj` are **template / build-seed projects**, NOT
  shipped libraries. They are not listed in `pxtarget.json` `bundleddirs`.
- The pxt framework references two of them *by name*
  (`node_modules/pxt-core/built/pxtlib.js`):
  - `pxt.BLOCKS_PROJECT_NAME = "blocksprj"` → default template for the **Blocks** editor.
  - `pxt.JAVASCRIPT_PROJECT_NAME = "tsprj"` → default template for the **JavaScript** editor.
  - A new project inherits its starting dependency set from the matching `*prj/pxt.json`.
- `bluetoothprj` is referenced *nowhere* in the framework or `pxtarget.json`. It only existed as an
  extra compile target so the bluetooth-enabled native variant got pre-built into the hex cache.
- During `pxt buildtarget`, each `*prj` is fully C++-compiled and the result is stored in
  `built/hexcache/` (hex files named by content hash). This pre-warms the cache so the first user of
  a given dependency combination gets an instant download instead of a fresh compile.

### Config flow V1 vs V2 (2026-07-21)
- The `yotta.config` / `yotta.optionalConfig` under `microbit-dal` is the **V1/DAL** (`mbdal`) config
  format. The Calliope build uses the **V2/CODAL** (`mbcodal`) variant.
- `pxtarget.json` `variants.mbcodal.compileService.yottaConfigCompatibility: true` translates those
  `microbit-dal.*` yotta keys into the CODAL build — which is why `security_level` etc. still take
  effect on the Calliope (V2) hex.
- Bluetooth service gating is per-key in `MicroBitBLEManager.cpp`:
  `#if CONFIG_ENABLED(MICROBIT_BLE_DFU_SERVICE)` (line ~384), `..._PARTIAL_FLASHING` (~388),
  `..._DEVICE_INFORMATION_SERVICE` (~392), `..._EVENT_SERVICE` (~398), etc. These map from
  `dfu_service`, `partial_flashing`, `device_info_service`, `event_service`.

### Bluetooth extension vs DFU/pairing bluetooth (2026-07-21)
- The **bluetooth extension** (`libs/bluetooth`) sets `microbit-dal.bluetooth.enabled = 1` and lets
  the user program register BLE services (accelerometer, UART, LED, …). BLE runs while the program
  runs → effectively "always on" during execution.
- **DFU / partial flashing / pairing** are separate config keys (`dfu_service`, `partial_flashing`,
  `pairing_mode`) gated independently. They belong to the maintenance/pairing flow (device exposes
  them in pairing mode), not to continuous app-time BLE, and do not require the bluetooth extension
  to be in the user's project.

### Hex cache / double compilation (2026-07-21)
- `built/hexcache/*.hex` are keyed by a **content hash of the native (C++) compilation inputs**
  (sources + merged config). The user's TS/Blocks source compiles to bytecode separately and does
  NOT affect the native hex.
- Therefore two projects with **identical native dependencies + identical yotta config** produce the
  same hash → the native image is compiled **once**; the second is a cache hit. Editor (blocks vs ts)
  is irrelevant to the native compile.

## Decisions

### 2026-07-21 — Trim template projects to core-only default, no radio
- **tsprj**: removed the `radio` dependency so new JavaScript projects start with `core + microphone`,
  matching `blocksprj`. Rationale: radio C++ is only linked when a project actually depends on it;
  pre-seeding a radio variant by default is unnecessary for this use case.
- **bluetoothprj**: deleted. It was only a hex-cache seed target and is referenced nowhere in the
  framework. Consequence: the bluetooth native variant is no longer pre-warmed, so the first user to
  enable bluetooth pays a one-time compile. No functional impact.
- **blocksprj + tsprj**: kept as **plain dependency lists** (`core + microphone`), no `yotta` block.
  - Config stays **centralized in `libs/core/pxt.json`** as the single source of truth; every project
    depends on core and inherits it. (An earlier revision duplicated the yotta block into both
    templates and was reverted 2026-07-21 per user preference.)
  - This still answers the double-compilation question: with identical deps and the same
    core-inherited config, the two templates hash to the same native image → compiled **once**, second
    is a cache hit.
- **Verified**: `pxt buildtarget` runs with no complaints about the removed `bluetoothprj`
  (confirmed 2026-07-21).
