namespace pxsim.control {

    // Reported by control.hardwareVersion(); Calliope mini v3 simulator identifies as "3".
    export function _hardwareVersion() {
        return board().hardwareVersion >= 3 ? "3" : "2";
    }

}