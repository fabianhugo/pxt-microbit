#include "pxt.h"

#if MICROBIT_CODAL
#include "LevelDetector.h"
#include "LevelDetectorSPL.h"
#endif

enum class DetectedSound {
    //% block="loud"
    Loud = 2,
    //% block="quiet"
    Quiet = 1
};

enum class SoundThreshold {
    //% block="loud"
    Loud = 2,
    //% block="quiet"
    Quiet = 1
};
namespace input {

#if MICROBIT_CODAL
bool didInit;

void init() {
    if (didInit) {
        return;
    }

    didInit = true;
    uBit.audio.levelSPL->setUnit(LEVEL_DETECTOR_SPL_8BIT);
}

#else
// Calliope mini v1/v2: analog MEMS microphone on uBit.io.MIC (no codal
// LevelDetector). soundLevel() samples the peak-to-peak amplitude like
// pxt-calliope does; onSound() runs a background fiber that compares the level
// against the thresholds and raises loud/quiet events with simple hysteresis.
#define CALLIOPE_ID_MICROPHONE 4001

static bool micFiberStarted;
// Measured on v1/v2 hardware with the p-p/4 scale: ~20 in a quiet room,
// 60-120 during a clap — so the loud default sits below the clap band,
// not at the block default of 128 (unreachable on this scale).
static int loudThreshold = 64;
static int quietThreshold = 40;

static int readSoundLevelDal() {
    int min = 1023;
    int max = 0;
    for (int i = 0; i < 32; i++) {
        int level = uBit.io.MIC.getAnalogValue();
        if (level > max)
            max = level;
        if (level < min)
            min = level;
        uBit.sleep(5); // allow the analog input to settle
    }
    int range = max - min;
    return range / 4; // 0..255
}

static void micWatcher() {
    // start below the loud threshold so a program that boots in silence gets
    // the first loud event as soon as it happens
    bool loud = false;
    while (true) {
        int level = readSoundLevelDal(); // ~160 ms per reading, sleeps inside
        if (!loud && level >= loudThreshold) {
            loud = true;
            MicroBitEvent(CALLIOPE_ID_MICROPHONE, (int)DetectedSound::Loud);
        } else if (loud && level <= quietThreshold) {
            loud = false;
            MicroBitEvent(CALLIOPE_ID_MICROPHONE, (int)DetectedSound::Quiet);
        }
    }
}

static void ensureMicFiber() {
    if (micFiberStarted)
        return;
    micFiberStarted = true;
    create_fiber(micWatcher);
}
#endif

/**
* Registers an event that runs when a sound is detected
*/
//% help=input/on-sound
//% blockId=input_on_sound block="on %sound sound"
//% parts="microphone"
//% weight=88 blockGap=12
//% group="Events"
void onSound(DetectedSound sound, Action handler) {
#if MICROBIT_CODAL
    init();
    const auto thresholdType = sound == DetectedSound::Loud ? LEVEL_THRESHOLD_HIGH : LEVEL_THRESHOLD_LOW;
    registerWithDal(DEVICE_ID_SYSTEM_LEVEL_DETECTOR, thresholdType, handler);
#else
    ensureMicFiber();
    registerWithDal(CALLIOPE_ID_MICROPHONE, (int)sound, handler);
#endif
}

/**
* Reads the loudness through the microphone from 0 (silent) to 255 (loud)
*/
//% help=input/sound-level
//% blockId=device_get_sound_level block="sound level"
//% parts="microphone"
//% weight=34 blockGap=8
//% group="Sensors"
int soundLevel() {
#if MICROBIT_CODAL
    init();
    return uBit.audio.levelSPL->getValue();
#else
    return readSoundLevelDal();
#endif
}

/**
* Sets the threshold for a sound type.
*/
//% help=input/set-sound-threshold
//% blockId=input_set_sound_threshold block="set %sound sound threshold to %value"
//% parts="microphone"
//% threshold.min=0 threshold.max=255 threshold.defl=128
//% weight=14 blockGap=8
//% advanced=true
//% group="Configuration"
void setSoundThreshold(SoundThreshold sound, int threshold) {
#if MICROBIT_CODAL
    init();
    LevelDetectorSPL* level = uBit.audio.levelSPL;
    if (NULL == level)
        return;
    if (SoundThreshold::Loud == sound)
        level->setHighThreshold(threshold);
    else
        level->setLowThreshold(threshold);
#else
    if (SoundThreshold::Loud == sound)
        loudThreshold = threshold;
    else
        quietThreshold = threshold;
#endif
}
}
