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

// Calliope v1/v2 DAL: route music/tone blocks through the DRV8837 speaker on bootup.
// DRV8837 truth table for the speaker config:
//   IN1=0, IN2=1 → Reverse  → OUT1=L, OUT2=H  (current through speaker)
//   IN1=1, IN2=1 → Brake    → OUT1=L, OUT2=L  (no current)
// So: IN2 (M1_DIR) = static HIGH reference, IN1 (M0_DIR) = PWM audio signal.
// OUT1 is always LOW; OUT2 swings with PWM → clean single-ended speaker drive.
if (hardware._motorDriverType() === 1) {
    pins.digitalWritePin(DigitalPin.M_MODE, 1)  // nSLEEP HIGH → driver active
    pins.digitalWritePin(DigitalPin.M1_DIR, 1)  // IN2 = static HIGH (OUT2 reference)
    pins.setAudioPin(DigitalPin.M0_DIR)          // IN1 = PWM audio → pitchPin = MOTOR_IN1
}

