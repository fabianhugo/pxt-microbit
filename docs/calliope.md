# Calliope mini Support in pxt-microbit

This document summarises the changes made to `pxt-microbit` to support all three
Calliope mini hardware variants:

| Variant | MCU | Runtime | Build path |
|---------|-----|---------|------------|
| Calliope mini v1 | nRF51822 | micro:bit DAL (yotta), CMSIS-DAP | `blocksprj` / `bluetoothprj` |
| Calliope mini v2 | nRF51822 | micro:bit DAL (yotta), Segger JTAG | `blocksprj` / `bluetoothprj` |
| Calliope mini v3 | nRF52833 | calliope-edu codal-microbit-v2 | `blocksprj` / `bluetoothprj` (codal) |

---

## 1. Build system (`pxtarget.json`)

`compileService.codalTarget` was updated to point to the calliope-edu fork of
`codal-microbit-v2` so that the codal build uses the correct Calliope v3 board
definition instead of the standard BBC micro:bit v2 one.

---

## 2. Extra pins (`libs/core/pins.cpp`, `libs/core/dal.d.ts`)

Calliope mini exposes additional GPIO pins that do not exist on the stock micro:bit.
The following were added:

| PXT name | DAL/codal ID | nRF pin | Notes |
|----------|-------------|---------|-------|
| `P3`  | `MICROBIT_ID_IO_P3`  | P0_01 | Calliope pad 3, touch-capable |
| `P16` | `MICROBIT_ID_IO_P16` | P0_26 | Calliope pad C / UART RX on v1/v2 |
| `P17` | `MICROBIT_ID_IO_P17` | P0_27 | UART TX on v1/v2 |
| `P18` | `MICROBIT_ID_IO_P18` | P0_28 | Added to `AnalogPin` for analog read |
| `RGB` | `MICROBIT_ID_IO_RGB` | see §4 | WS2812B data pin, hidden in block picker |

`#ifndef` guards in `pins.cpp` provide fallback defines for when the host DAL does
not define a symbol, keeping the code compatible with the unmodified Lancaster
micro:bit DAL while picking up the real values from the Calliope DAL fork.

`dal.d.ts` was extended with matching TypeScript enum values so that PXT's static
enum evaluator resolves pin IDs correctly without needing a running device.

---

## 3. Motor driver blocks (`libs/core/motors.ts`)

Calliope mini v3 has a dual H-bridge motor driver with five GPIO lines.
The following pin IDs were added to `pins.cpp` and `dal.d.ts`:

| Symbol | Codal ID | Purpose |
|--------|---------|---------|
| `M_MODE` | `DEVICE_ID_IO_P0 + 56` = 156 | H-bridge mode select |
| `M0_DIR`  | `DEVICE_ID_IO_P0 + 52` = 152 | Motor A direction |
| `M0_SPEED`| `DEVICE_ID_IO_P0 + 53` = 153 | Motor A speed (PWM) |
| `M1_DIR`  | `DEVICE_ID_IO_P0 + 54` = 154 | Motor B direction |
| `M1_SPEED`| `DEVICE_ID_IO_P0 + 55` = 155 | Motor B speed (PWM) |

All motor pin enum entries are `blockHidden=1` and only resolved via `getPin()`
under `#if MICROBIT_CODAL`.

`motors.ts` provides the public `Motor` / `MotorCommand` enums and the
`motors.dualMotorPower()` / `motors.motorCommand()` blocks
(namespace colour `#008272`, weight 30, icon `\uf1b9`).

---

## 4. RGB LED (`libs/core/rgbled.ts`)

### Hardware

| Variant | LED count | Interface | Pin |
|---------|-----------|-----------|-----|
| v1 / v2 | 1 × WS2812B | one-wire NZR | P0_18 (`MICROBIT_PIN_RGB`) |
| v3      | 3 × WS2812B | one-wire NZR | dedicated RGB pad |

### Pin ID alignment

`MICROBIT_ID_IO_RGB` is **151** (`DEVICE_ID_IO_P0 + 51`) in both codal and the
Calliope DAL fork.  The DAL `MicroBitComponent.h` was updated from 121 → 151 so
that `dal.d.ts`, `pins.cpp` fallback defines, and the codal `MicroBitCompat.h`
alias all agree on a single numeric value.

### Implementation (pure TypeScript)

The RGB LED is driven entirely from TypeScript via the existing
`light.sendWS2812Buffer()` shim (backed by the same NZR assembly used for
NeoPixel strips).  No Calliope-specific C++ RGB code is compiled.

Key design decisions:

* **Two separate `Buffer` objects** — `_rgbBuf1` (3 bytes, single LED) and
  `_rgbBuf3` (9 bytes, three LEDs) — prevent cross-contamination when switching
  between `setLedColor` and `setLedColors`.
* **WS2812B latch** — after every send, `control.waitMicros(1000)` followed by
  `pins.digitalWritePin(DigitalPin.RGB, 0)` holds the data line low for ≥ 50 µs,
  committing the frame to the LEDs and preparing the line for the next reset.
* **`hardware._rgbLedCount()`** — a tiny C++ shim in `pins.cpp` returns 3 on
  codal builds and 1 on DAL builds.  `setLedColors` calls this at runtime and
  returns immediately on v1/v2 (one LED, three-LED block is a no-op).

### `getPin()` for RGB

`pins.cpp`'s `getPin()` switch handles the RGB pin in both build variants:

```cpp
#if MICROBIT_CODAL
    case MICROBIT_ID_IO_RGB: return &uBit.io.RGB;
    // ...motor pins...
#else
#ifdef MICROBIT_PIN_RGB
    case MICROBIT_ID_IO_RGB: return &uBit.io.RGB; // Calliope DAL v1/v2
#endif
#endif
```

---

## 5. Calliope DAL changes (`built/yt/…/microbit-dal/`)

The Calliope fork of the Lancaster micro:bit DAL required several fixes to build
cleanly against the updated `MicroBitIO` constructor signature:

| File | Change |
|------|--------|
| `inc/core/MicroBitComponent.h` | Removed duplicate `MOTOR_IN1` / `MOTOR_IN2` defines; changed `MICROBIT_ID_IO_RGB` 121 → 151 |
| `inc/drivers/MicroBitIO.h` | Added 5 new member pins: `RGB`, `MIC`, `MOTOR_SLEEP`, `MOTOR_IN1`, `MOTOR_IN2`; extended constructor declaration to 25 args |
| `source/drivers/MicroBitIO.cpp` | Extended constructor definition with member initialisers for the 5 new pins |
| `source/MicroBit.cpp` (both `blocksprj` and `bluetoothprj`) | Extended `io(…)` initialiser call from 20 → 25 arguments |

---

## 6. DAL configuration — should it be changed?

**Short answer: yes, and here is how.**

The yotta build target (`bbc-microbit-classic-gcc`) has an empty `config` object in
its `target.json`.  Yotta propagates `config` entries into the generated
`yotta_config.h` as `YOTTA_CFG_*` macros, which are included by `MicroBitConfig.h`.

Adding a Calliope flag:

```json
// libs/blocksprj/built/yt/yotta_targets/bbc-microbit-classic-gcc/target.json
"config": {
    "microbit-dal": {
        "calliope": 1
    }
}
```

would emit `#define YOTTA_CFG_MICROBIT_DAL_CALLIOPE 1` and allow DAL source files
to guard Calliope-specific code with:

```cpp
#if YOTTA_CFG_MICROBIT_DAL_CALLIOPE
    // Calliope-only init
#endif
```

This is the correct yotta idiom and avoids scattering ad-hoc `#ifdef` checks
tied to specific pin names.  The same entry should be added to the `bluetoothprj`
copy of `target.json`.

Until the calliope-edu DAL fork is published to a stable git tag that PXT can
download automatically, changes to `built/yt/…` must be applied manually after
each `pxt clean`.

---

## 7. Known limitations / future work

* `setLedColors` silently does nothing on v1/v2 (by design). There is currently
  no user-visible indication that the block is a v3-only feature.
* `P17` / `P18` are guarded by `#if MICROBIT_CODAL` in `getPin()`.  On Calliope
  v1/v2 DAL builds, these pins exist in `MicroBitIO` but are not yet wired up in
  `getPin()`.
* Motor blocks are v3-only.  A separate single-motor API for v1/v2
  (`uBit.soundmotor`, DRV8837 via SLEEP/IN1/IN2) has not yet been implemented.
* Changes to `built/yt/…` are not tracked by PXT's dependency manager; they
  will be overwritten by `pxt clean`.  The authoritative source of truth must
  be the calliope-edu DAL git repository.
