namespace hardware {
    /**
     * Returns the motor driver type.
     * 2 = Calliope v3 codal dual H-bridge, 1 = Calliope v1/v2 DAL single DRV8837, 0 = none.
     */
    //% shim=hardware::_motorDriverType
    export function _motorDriverType(): int32 { return 0 }
}
