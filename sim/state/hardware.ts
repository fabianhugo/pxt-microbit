namespace pxsim.hardware {

    export function _rgbLedCount(): number {
        return board().hardwareVersion >= 3 ? 3 : 1;
    }

}
