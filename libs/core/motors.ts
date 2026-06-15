enum Motor {
    //% block="M0"
    M0,
    //% block="M1"
    M1,
    //% block="M0 & M1"
    M0_M1
}

/**
* Blocks to control the onboard motors
*/
//% color=#008272 weight=30 icon="\uf1b9"
namespace motors {

    /**
    * Controls two motors attached to the board.
    */
    //% blockId=block_dual_motor block="motor %motor|at %percent \\%"
    //% percent.shadow="speedPicker"
    //% weight=80
    //% duty_percent.defl=100
    //% parts="motor" trackArgs=0
    export function dualMotorPower(motor: Motor, duty_percent: number) {
        const driverType = hardware._motorDriverType()
        if (driverType === 0) return

        pins.digitalWritePin(DigitalPin.M_MODE, 1)

        if (driverType === 1) {
            // Calliope v1/v2: single DRV8837; M0 → IN1 (M0_DIR), M1 → IN2 (M1_DIR)
            // Each channel is unidirectional — negative duty_percent is treated as 0 (stop)
            const power = Math.clamp(0, 1023, Math.map(duty_percent, 0, 100, 0, 1023))
            pins.analogWritePin(AnalogPin.M0_DIR, (motor === Motor.M0 || motor === Motor.M0_M1) ? power : 0)
            pins.analogWritePin(AnalogPin.M1_DIR, (motor === Motor.M1 || motor === Motor.M0_M1) ? power : 0)
        } else {
            // Calliope v3 codal: dual H-bridge
            const power = Math.clamp(-1023, 1023, Math.map(duty_percent, -100, 100, -1023, 1023))
            if (motor === Motor.M0 || motor === Motor.M0_M1) {
                pins.digitalWritePin(DigitalPin.M0_DIR, ((power < 0) ? 1 : 0))
                pins.analogWritePin(AnalogPin.M0_SPEED, Math.abs(power))
            }
            if (motor === Motor.M1 || motor === Motor.M0_M1) {
                pins.digitalWritePin(DigitalPin.M1_DIR, ((power < 0) ? 1 : 0))
                pins.analogWritePin(AnalogPin.M1_SPEED, Math.abs(power))
            }
        }
    }

}

// Calliope v1/v2 DAL note: the speaker and motors share one DRV8837. The audio config
// (nSLEEP HIGH, IN2/M1_DIR static HIGH, IN1/M0_DIR = PWM) must NOT be applied eagerly at
// boot: with IN2 driven HIGH while the driver is awake, the H-bridge output is energized,
// which is identical to "M1 at full power" — so M1 would spin even in a program with no
// blocks. Instead the C++ audio path sets this config lazily on the first tone and
// re-asserts it before every tone (see analogPitch in pins.cpp). Until audio or a motor
// block runs, the driver stays asleep (nSLEEP LOW → outputs Hi-Z) and no motor spins.

