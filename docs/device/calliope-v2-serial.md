# Calliope mini v2 serial monitor

The Calliope mini **v1** and **v3** stream serial to the in-editor serial monitor
over WebUSB, using the CMSIS-DAP interface chip. The Calliope mini **v2** (and
**v2.1**) uses a different interface chip — a **SEGGER J-Link OB** — so it needs a
different path for serial. This page describes how the serial monitor works on
v2, what to expect the first time you connect, and how to troubleshoot it.

## Why v2 is different

| Board | Interface chip | Serial transport used by the editor |
|-------|----------------|-------------------------------------|
| v1 / v3 | CMSIS-DAP (DAPLink-style) | WebUSB — UART is read with the DAP vendor command `0x83` |
| v2 / v2.1 | SEGGER J-Link OB | **Web Serial** — the J-Link OB bridges the nRF UART to a standard USB CDC Virtual COM Port |

On v2 the J-Link OB exposes several USB functions on the same device
(VID `0x1366` / PID `0x1025`):

* a **CDC Virtual COM Port** (the target UART bridge),
* a **vendor-specific interface** used for flashing (J-Link MSD), and
* a mass-storage interface.

Flashing continues to use WebUSB on the vendor interface. Serial, however, cannot
use WebUSB: the operating system's serial driver (`cdc_acm` on Linux,
`usbser.sys` on Windows) claims the CDC interfaces, and WebUSB is not allowed to
claim an interface a kernel driver already owns. The editor therefore reads the
Virtual COM Port through the **Web Serial API** (`navigator.serial`), which is
designed to layer on top of the OS serial driver and works on all desktop
platforms.

## What to expect when you connect

The first time you connect a v2 board in a browser profile you will see **two**
permission prompts:

1. the usual **WebUSB** pairing dialog (used for flashing), then
2. a **Web Serial** "connect to a serial port" dialog (used for the monitor).

Pick your Calliope mini in the serial dialog:

* **Windows** — a `COM` port, typically labelled **`JLink CDC UART Port (COMx)`**.
* **macOS** — a `/dev/cu.usbmodem…` entry.
* **Linux** — a `/dev/ttyACM…` entry (usually `/dev/ttyACM0`).

The grant is remembered, so on later connects the editor reuses the port
automatically and **no second prompt appears**. The serial port list is not
filtered by device (see the note below), so on Linux you may see several
`tty*` entries — choose the `ttyACM*` that corresponds to the board.

### ~ hint

#### The prompt text can't be customised

Both dialogs are native browser UI and, for security reasons, their title and
text cannot be changed or styled by the editor — exactly like the WebUSB
pairing dialog.

### ~

## Troubleshooting

**The serial dialog is empty / the board isn't listed.**
The board must be plugged in and paired over WebUSB first. Serial requires a
Chromium-based browser (Chrome/Edge); Firefox and Safari do not implement the
Web Serial API, and on those browsers the serial monitor is unavailable while
flashing still works.

**Serial never shows any data (Linux).**
On some Linux distributions **ModemManager** grabs `/dev/ttyACM0` for the first
10–30 seconds after plug-in (it probes the port as a modem), which blocks the
editor from opening it. Test with:

```
sudo systemctl stop ModemManager
```

then replug and reconnect. For a permanent fix, add a udev rule telling
ModemManager to ignore the board (VID `1366`, PID `1025`).

**Serial never shows any data (any platform).**
The port can only be opened by one program at a time. Close any other serial
terminal — `screen`, `minicom`, `cat /dev/ttyACM0`, PuTTY, the Arduino IDE, etc.
— that might be holding the port, then reconnect.

**Still nothing?**
Make sure the running program actually writes to serial (for example
[`serial.writeLine`](/reference/serial/write-line)). If the program emits no
serial data, the monitor stays empty by design.

## Notes for maintainers

The implementation lives in [`editor/flash.ts`](https://github.com/calliope-edu/pxt-calliope):

* `JLinkPacketIOWrapper` handles v2 flashing (J-Link MSD) and now also serial.
  `startSerialAsync()` opens the Virtual COM Port at **115200** baud via
  `navigator.serial` and pumps incoming bytes into `onSerial`; `stopSerial()`
  tears the reader/port down on disconnect.
* `CalliopeWrapper` routes to `JLinkPacketIOWrapper` (v2) or `DAPWrapper`
  (v1/v3) based on the connected USB device.
* **No device filter is applied to the serial picker.** A `usbVendorId`/
  `usbProductId` filter was tried first, but Chrome derives its serial-port
  metadata from the OS and on some setups (observed on Pop!_OS) reports no
  `usbVendorId` for the CDC port — which makes a filtered picker come up empty.
  Reuse via `getPorts()` therefore prefers a vendor-id match but falls back to
  the sole granted port.
* Diagnostics are gated behind the `?webusbdbg=1` URL flag and print `jlink
  serial:` lines to the console (port open, open failures, read errors).
