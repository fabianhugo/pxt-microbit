namespace hardware {
    /**
     * Returns the motor driver type.
     * 2 = Calliope v3 codal dual H-bridge, 1 = Calliope v1/v2 DAL single DRV8837, 0 = none.
     */
    // On device the C++ shim (pins.cpp) returns the real per-board value. This TS body is the
    // simulator implementation: the simulator models Calliope mini v3, so it reports the v3
    // dual H-bridge (2) — otherwise motors.dualMotorPower() would early-return and the sim
    // motor visualization would never activate.
    //% shim=hardware::_motorDriverType
    export function _motorDriverType(): int32 { return 2 }
}
