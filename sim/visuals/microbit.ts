namespace pxsim.visuals {

    const MB_STYLE = `
        .simEventBtn {
            height: 84px;
            font-size: 1.4rem;
            font-weight: 900;
            padding: 1.25rem 1.75rem;
            border-radius: 9999px;
            border: 0;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 0.07em;
            color: white;
            background: rgb(201, 0, 114); // #42c9c9;
            font-family: 'Roboto Mono', monospace;
            /* iOS Safari fixes - avoid position, transform, transition in foreignObject */
            -webkit-tap-highlight-color: transparent;
            -webkit-user-select: none;
            user-select: none;
            -webkit-touch-callout: none;
            touch-action: manipulation;
            pointer-events: auto;
        }
        /* smaller icon-style gesture buttons */
        .simEventBtn.simGestureBtn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            width: 100%;
        }

        .sim-gesture-menu {
            pointer-events: auto;
        }
        
        .sim-gesture-menu foreignObject {
            pointer-events: auto;
        }
        
        .sim-gesture-menu .simEventBtn.simGestureBtn {
            // border-radius: 0;
        }
        .simEventBtn.simGestureBtn img {
            width: 84px;
            height: 84px;
            display:block;
        }
        /* caret for dropdown inside gesture button */
        .sim-gesture-caret {
            margin-left: 8px;
            font-size: 42px;
            line-height: 1;
            display: inline-block;
        }
        /* split gesture button: left = action, right = dropdown */
        .sim-gesture-split {
            display: inline-flex;
            align-items: stretch;
        }
        .simEventBtn.simGestureLeft {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            padding-right: 4px;
            padding-left: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        .simEventBtn.simGestureRight {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            padding-left: 4px;
            padding-right: 12px;
            width: 64px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        /* ensure foreignObject content participates in pointer events */
        foreignObject > body > button.simEventBtn {
            pointer-events: auto;
            -webkit-appearance: none;
        }
        /* iOS Safari foreignObject fixes */
        foreignObject {
            pointer-events: auto;
            overflow: visible;
        }
        foreignObject > body {
            pointer-events: auto;
            overflow: visible;
            background: transparent;
        }
        button {
            user-select: none;
            -webkit-user-select: none;
            -webkit-tap-highlight-color: transparent;
        }
        /* button hover - avoid transform in foreignObject for iOS Safari */
        .simEventBtn:hover {
            background: rgba(201, 0, 114, 0.8);
        }
        /* Gesture dropdown menu - now fully HTML-based for better styling */
        .sim-gesture-dropdown-container {
            margin: 0;
            padding: 0;
            background: transparent;
            width: 100%;
            height: 100%;
            pointer-events: auto;
        }
        
        .sim-gesture-dropdown {
            /* Safari foreignObject positioning fix */
            position: fixed;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 16px;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(200, 200, 200, 0.1);
            -webkit-font-smoothing: antialiased;
            pointer-events: auto;
            /* Safari doesn't scale foreignObject with SVG, so we need transform-origin for manual scaling */
            transform-origin: 0 0;
        }

        .sim-gesture-dropdown *,
        .sim-gesture-dropdown *:after,
        .sim-gesture-dropdown *:before {
            user-select: none !important;
            -webkit-user-select: none !important;
        }
        
        .sim-gesture-dropdown-grid {
            pointer-events: auto;
        }
        
        .sim-gesture-dropdown-item {
            touch-action: manipulation !important;
        }
        
        .sim-gesture-dropdown-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 12px;
            color: #fff;
            font-family: 'Roboto Mono', monospace;
            font-size: 16px;
            user-select: none;
            -webkit-user-select: none;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }
            padding: 12px;
            color: #fff;
            font-family: 'Roboto Mono', monospace;
            font-size: 16px;
            user-select: none;
            cursor: pointer;
        }
        
        .sim-gesture-dropdown-toggle input[type="checkbox"] {
            width: 24px;
            height: 24px;
            cursor: pointer;
        }
        
        .sim-gesture-dropdown-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
        }
        
        .sim-gesture-dropdown-item {
            background: linear-gradient(135deg, rgb(201, 0, 114), rgb(170, 0, 95));
            border: none;
            border-radius: 12px;
            padding: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 80px;
            box-shadow: 0 2px 8px rgba(201, 0, 114, 0.3);
            /* iOS Safari fixes - avoid transition and transform in foreignObject */
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
            -webkit-user-select: none;
            user-select: none;
        }
        
        .sim-gesture-dropdown-item:hover {
            box-shadow: 0 4px 12px rgba(201, 0, 114, 0.5);
        }
        
        .sim-gesture-dropdown-item:active {
            background: rgba(170, 0, 95, 1);
            box-shadow: 0 1px 4px rgba(201, 0, 114, 0.4);
        }
        
        .sim-gesture-dropdown-item img {
            width: 64px;
            height: 64px;
            display: block;
        }
        
        /* Flex container for buttons at bottom */
        .sim-buttons-flex-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            background: transparent;
        }
        
        .sim-buttons-flex-container > * {
            flex: 0 0 auto; /* Don't grow, don't shrink, auto basis */
        }

        /* background rectangle for the gesture menu (the group itself can't have a background) */
        .sim-gesture-menu-bg {
            fill: rgba(0, 0, 0, 0.6);
            /* subtle rounded corners and shadow-like feel */
            stroke: none;
            /* allow clicks on background to register as inside the menu */
            pointer-events: auto;
        }
        .sim-gesture-menu .simEventBtn {
            background: rgb(201,0,114);
            color: #fff;
        }
        .sim-gesture-menu .simEventBtn:hover {
            filter: brightness(0.85);
        }
        button:active {
            background: #e6007d;
        }

        svg.sim {
            margin-bottom:1em;
        }
        svg.sim.grayscale {
            -moz-filter: grayscale(1);
            -webkit-filter: grayscale(1);
            filter: grayscale(1);
        }
        .sim-button-group {
            cursor: pointer;
        }
        .sim-head .sim-button {
            pointer-events: unset;
        }
        .sim-button {
            pointer-events: none;
        }
        .sim-board, .sim-display, sim-button {
            fill: #111;
        }
        .sim-button-outer.hover {
            stroke:grey;
            stroke-width: 3px;
        }
        .sim-button-nut {
            fill:#704A4A;
            pointer-events:none;
        }
        .sim-button-nut:hover {
            stroke:1px solid #704A4A;
        }
<<<<<<< HEAD
        .sim-pin[focusable=true]:hover {
            stroke:#D4AF37;
            stroke-width:2px;
        }

        .sim-pin-touch[focusable=true].touched {
            stroke:darkorange !important;
            stroke-width:5px;
=======
        .sim-pin.hover {
            stroke:#D4AF37;
            stroke-width:2px;
        }
        .sim-pin.touched {
            stroke:darkorange;
            stroke-width:2.5px;
        }
        .sim-pin-touch.touched:hover {
            stroke:darkorange;
>>>>>>> hugo_wipboehm
        }
        .sim-led-back:hover {
            stroke:#fff;
            stroke-width:3px;
        }
        .sim-led:hover {
            stroke:#ff7f7f;
            stroke-width:3px;
        }

        .sim-systemled {
            fill:#333;
            stroke:#555;
            stroke-width: 1px;
        }

        .sim-light-level-button {
            stroke:#ccc;
            stroke-width: 2px;
        }

        .sim-antenna {
            fill-opacity:0.0;
            stroke:#555;
            stroke-width: 4px;
        }

        .sim-text {
            font-family: 'Roboto Mono', monospace;
            font-size:14px;
            fill:#fff;
            pointer-events: none; user-select: none;
        }

        .sim-text-pin {
            font-family: 'Roboto Mono', monospace;
            pointer-events: none; user-select: none;
            fill:#000;
            font-size:24px;
            stroke:#fff;
            stroke-alignment: outside;
            paint-order: stroke;
            stroke-width: 3px;
        }

        .sim-thermometer {
            stroke:#aaa;
            stroke-width: 2px;
        }

        .inverted {
            fill:#000;
            stroke:#fff;
            stroke-alignment: outside;
            paint-order: stroke;
            stroke-width: 3px;
        }
        .big {
            font-size:24px;
            font-weight: bold;
        }
        .centered {
            transform: translateX(-1.5ch);
            text-align: center;
        }

        /* animations */
        .sim-theme-glow {
            animation-name: sim-theme-glow-animation;
            animation-timing-function: ease-in-out;
            animation-direction: alternate;
            animation-iteration-count: infinite;
            animation-duration: 1.25s;
        }
        @keyframes sim-theme-glow-animation {
            from { opacity: 1; }
            to   { opacity: 0.75; }
        }

        .sim-flash {
            animation-name: sim-flash-animation;
            animation-duration: 0.1s;
        }

        @keyframes sim-flash-animation {
            from { fill: yellow; }
            to   { fill: default; }
        }

        .sim-flash-stroke {
            animation-name: sim-flash-stroke-animation;
            animation-duration: 0.4s;
            animation-timing-function: ease-in;
        }

        @keyframes sim-flash-stroke-animation {
            from { stroke: yellow; }
            to   { stroke: default; }
        }

        /* wireframe */
        .sim-wireframe * {
            fill: none;
            stroke: black;
        }
        .sim-wireframe .sim-display,
        .sim-wireframe .sim-led,
        .sim-wireframe .sim-led-back,
        .sim-wireframe .sim-head,
        .sim-wireframe .sim-theme,
        .sim-wireframe .sim-button-group,
        .sim-wireframe .sim-button-label,
        .sim-wireframe .sim-button,
        .sim-wireframe .sim-text-pin
        {
            visibility: hidden;
        }
        .sim-wireframe .sim-label
        {
            stroke: none;
            fill: #777;
        }
        .sim-label, .sim-button-label {
            fill: #000;
            pointer-events: none;
        }
        .sim-wireframe .sim-board {
            stroke-width: 2px;
        }
        *:focus {
            outline: none;
        }
        *:focus-visible .sim-button-outer,
        .sim-shake:focus-visible,
        .sim-thermometer:focus-visible {
            outline: 5px solid white;
            stroke: black;
            stroke-width: 10px;
            paint-order: stroke;
        }
<<<<<<< HEAD
        .sim-button-outer.sim-button-group:focus-visible > .sim-button {
            outline: 5px solid white;
            stroke: black;
            stroke-width: 5px;
            paint-order: stroke;
        }
        .sim-light-level-button:focus-visible,
        .sim-antenna-outer:focus-visible > .sim-antenna {
            outline: 5px solid white;
        }
        .sim-pin:focus-visible {
            stroke: white;
            stroke-width: 5px !important;
        }
        .no-drag, .sim-text, .sim-text-small,
        .sim-text-pin {
=======
        .no-drag, .sim-text, .sim-text-pin {
>>>>>>> hugo_wipboehm
            user-drag: none;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-drag: none;
            -webkit-user-select: none;
            -ms-user-select: none;
        }
<<<<<<< HEAD
        [focusable=true] {
            cursor: pointer;
        }
    `;
    const MB_HIGHCONTRAST = `
path.sim-board {
    stroke: white;
    stroke-width: 3;
}
.sim-led {
    stroke: red;
}
.sim-led-back {
    stroke: white;
}
*:focus-visible .sim-button-outer,
.sim-pin:focus-visible,
.sim-thermometer:focus-visible,
.sim-shake:focus-visible,
.sim-light-level-button:focus-visible {
    stroke: #10C8CD !important;
}
    `
    const pins4onXs = [66.7, 79.1, 91.4, 103.7, 164.3, 176.6, 188.9, 201.3, 213.6, 275.2, 287.5, 299.8, 312.1, 324.5, 385.1, 397.4, 409.7, 422];
    const pins4onMids = pins4onXs.map(x => x + 5);
    const littlePinDist = pins4onMids[1] - pins4onMids[0];
    const bigPinWidth = pins4onMids[4] - pins4onMids[3];
    const pin0mid = pins4onXs[0] - bigPinWidth / 2.0;
    const pin3mid = pin0mid - bigPinWidth / 2.0;
    const pin1mid = pins4onMids[3] + bigPinWidth / 2.0;
    const pin2mid = pins4onMids[8] + bigPinWidth / 2.0;
    const pin3Vmid = pins4onMids[13] + bigPinWidth / 2.0;
    const pinGNDmid = pins4onMids[pins4onMids.length - 1] + bigPinWidth / 2.0;
    const pinGND2mid = pinGNDmid + bigPinWidth / 2.0;
    const pinMids = [pin0mid, pin1mid, pin2mid, pin3mid].concat(pins4onMids).concat([pinGNDmid, pin3Vmid, pinGND2mid]);
    const pinNames = [
        "P0", "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10",
        "P11", "P12", "P13", "P14", "P15", "P16", "P17", "P18", "P19", "P20",
        "GND0", "GND", "+3v3", "GND1"];
    const pinDrawOrder = [
        "P3", "P0", "P4", "P5", "P6", "P7", "P1", "P8", "P9", "P10", "P11",
        "P12", "P2", "P13", "P14", "P15", "P16", "P17", "P18", "P19", "P20",
        "GND0", "GND", "+3v3", "GND1"
    ];
    interface PinTitle {
        title: string,
        ariaLabel: string
    }
    // title is currently unused.
    const pinTitles: PinTitle[] = [
        { title: "P0, ANALOG IN", ariaLabel: pxsim.localization.lf("Pin 0") },
        { title: "P1, ANALOG IN", ariaLabel: pxsim.localization.lf("Pin 1") },
        { title: "P2, ANALOG IN", ariaLabel: pxsim.localization.lf("Pin 2") },
        { title: "P3, ANALOG IN, LED Col 1", ariaLabel: pxsim.localization.lf("Pin 3") },
        { title: "P4, ANALOG IN, LED Col 2", ariaLabel: pxsim.localization.lf("Pin 4") },
        { title: "P5, BUTTON A", ariaLabel: pxsim.localization.lf("Pin 5") },
        { title: "P6, LED Col 9", ariaLabel: pxsim.localization.lf("Pin 6") },
        { title: "P7, LED Col 8", ariaLabel: pxsim.localization.lf("Pin 7") },
        { title: "P8", ariaLabel: pxsim.localization.lf("Pin 8") },
        { title: "P9, LED Col 7", ariaLabel: pxsim.localization.lf("Pin 9") },
        { title: "P10, ANALOG IN, LED Col 3", ariaLabel: pxsim.localization.lf("Pin 10") },
        { title: "P11, BUTTON B", ariaLabel: pxsim.localization.lf("Pin 11") },
        { title: "P12, RESERVED ACCESSIBILITY", ariaLabel: pxsim.localization.lf("Pin 12") },
        { title: "P13, SPI - SCK", ariaLabel: pxsim.localization.lf("Pin 13") },
        { title: "P14, SPI - MISO", ariaLabel: pxsim.localization.lf("Pin 14") },
        { title: "P15, SPI - MOSI", ariaLabel: pxsim.localization.lf("Pin 15") },
        { title: "P16, SPI - Chip Select", ariaLabel: pxsim.localization.lf("Pin 16") },
        { title: "P17, +3v3", ariaLabel: pxsim.localization.lf("Pin 3V") },
        { title: "P18, +3v3", ariaLabel: pxsim.localization.lf("Pin 3V") },
        { title: "P19, I2C - SCL", ariaLabel: pxsim.localization.lf("Pin 19") },
        { title: "P20, I2C - SDA", ariaLabel: pxsim.localization.lf("Pin 20") },
        { title: "GND", ariaLabel: pxsim.localization.lf("Pin GND") },
        { title: "GND", ariaLabel: pxsim.localization.lf("Pin GND") },
        { title: "+3v3", ariaLabel: pxsim.localization.lf("Pin 3V") },
        { title: "GND", ariaLabel: pxsim.localization.lf("Pin GND") },
    ];
    const MB_WIDTH = 500;
    const MB_HEIGHT = 408;
=======
>>>>>>> hugo_wipboehm

        /* Ensure 3D transforms work on the SVG and all children */
        svg.shake_animation,
        svg.tiltleft_animation,
        svg.tiltright_animation,
        svg.tiltforward_animation,
        svg.tiltbackwards_animation,
        svg.frontsideup_animation,
        svg.backsideup_animation,
        svg.freefall_animation,
        svg.impact3g_animation,
        svg.impact6g_animation,
        svg.impact8g_animation {
            transform-style: preserve-3d;
        }

        svg.shake_animation > *,
        svg.tiltleft_animation > *,
        svg.tiltright_animation > *,
        svg.tiltforward_animation > *,
        svg.tiltbackwards_animation > *,
        svg.frontsideup_animation > *,
        svg.backsideup_animation > *,
        svg.freefall_animation > *,
        svg.impact3g_animation > *,
        svg.impact6g_animation > *,
        svg.impact8g_animation > * {
            transform-style: preserve-3d;
        }

        .shake_animation {
            animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
            backface-visibility: hidden;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            10% { transform: translateX(-3px) rotate(-1deg); }
            20% { transform: translateX(3px) rotate(1deg); }
            30% { transform: translateX(-3px) rotate(-1deg); }
            40% { transform: translateX(3px) rotate(1deg); }
            50% { transform: translateX(-3px) rotate(-1deg); }
            60% { transform: translateX(3px) rotate(1deg); }
            70% { transform: translateX(-2px) rotate(-0.5deg); }
            80% { transform: translateX(2px) rotate(0.5deg); }
            90% { transform: translateX(-1px) rotate(-0.25deg); }
        }

        /* Motor spin — duration is set inline per motor; direction via animation-direction */
        @keyframes sim-motor-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
        }
        .sim-motor-rotor {
            transform-origin: center;
            transform-box: fill-box;
        }
        .sim-motor-cable {
            fill: none;
            stroke-linecap: round;
        }

        /* Tilt Left - left edge moves away, right edge comes forward */
        .tiltleft_animation {
            animation: tilt-left 0.7s ease-in-out both;
            transform-origin: 50% 50%;
            backface-visibility: hidden;
        }

        @keyframes tilt-left {
            0%, 100% { transform: perspective(600px) rotateY(0deg) rotateX(0deg); }
            50% { transform: perspective(600px) rotateY(-30deg) rotateX(2deg); }
        }

        /* Tilt Right - right edge moves away, left edge comes forward */
        .tiltright_animation {
            animation: tilt-right 0.7s ease-in-out both;
            transform-origin: 50% 50%;
            backface-visibility: hidden;
        }

        @keyframes tilt-right {
            0%, 100% { transform: perspective(600px) rotateY(0deg) rotateX(0deg); }
            50% { transform: perspective(600px) rotateY(30deg) rotateX(2deg); }
        }

        /* Tilt Backwards - top edge moves away, bottom edge comes backwards */
        .tiltbackwards_animation {
            animation: tilt-backwards 0.7s ease-in-out both;
            transform-origin: 50% 50%;
            backface-visibility: hidden;
        }

        @keyframes tilt-backwards {
            0%, 100% { transform: perspective(600px) rotateX(0deg) rotateY(0deg); }
            50% { transform: perspective(600px) rotateX(30deg) rotateY(0deg); }
        }

        /* Tilt Forward - bottom edge moves away, top edge comes forward */
        .tiltforward_animation {
            animation: tilt-forward 0.7s ease-in-out both;
            transform-origin: 50% 50%;
            backface-visibility: hidden;
        }

        @keyframes tilt-forward {
            0%, 100% { transform: perspective(600px) rotateX(0deg) rotateY(0deg); }
            50% { transform: perspective(600px) rotateX(-30deg) rotateY(0deg); }
        }

        /* Screen Down - rotate to show front */
        .backsideup_animation {
            animation: screen-down 1s ease-in-out both;
            transform-origin: 50% 50%;
            backface-visibility: hidden;
        }

        @keyframes screen-down {
            0%, 100% { transform: perspective(600px) rotateX(0deg); }
            50% { transform: perspective(600px) rotateX(-75deg); }
        }

        /* Screen Up - rotate to show back */
        .frontsideup_animation {
            animation: screen-up 1s ease-in-out both;
            transform-origin: 50% 50%;
            backface-visibility: hidden;
        }

        @keyframes screen-up {
            0%, 100% { transform: perspective(600px) rotateX(0deg); }
            50% { transform: perspective(600px) rotateX(75deg); }
        }

        .freefall_animation {
            animation: freefall 1.2s cubic-bezier(.22,.9,.35,1) both;
            backface-visibility: hidden;
        }

        @keyframes freefall {
            0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
            50% { transform: translateY(40px) scale(0.93); opacity: 0.65; }
        }

        .impact3g_animation {
            animation: impact-3g 0.6s cubic-bezier(.36,.07,.19,.97) both;
            backface-visibility: hidden;
        }

        @keyframes impact-3g {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.08); }
            50% { transform: scale(0.92); }
            75% { transform: scale(1.06); }
        }

        .impact6g_animation {
            animation: impact-6g 0.8s cubic-bezier(.36,.07,.19,.97) both;
            backface-visibility: hidden;
        }

        @keyframes impact-6g {
            0%, 100% { transform: scale(1); }
            15% { transform: scale(1.15); }
            30% { transform: scale(0.85); }
            45% { transform: scale(1.15); }
            60% { transform: scale(0.88); }
            75% { transform: scale(1.08); }
        }

        .impact8g_animation {
            animation: impact-8g 1s cubic-bezier(.36,.07,.19,.97) both;
            backface-visibility: hidden;
        }

        @keyframes impact-8g {
            0%, 100% { transform: scale(1) rotate(0deg); }
            12% { transform: scale(1.2) rotate(2deg); }
            24% { transform: scale(0.8) rotate(-2deg); }
            36% { transform: scale(1.2) rotate(2deg); }
            48% { transform: scale(0.82) rotate(-2deg); }
            60% { transform: scale(1.15) rotate(1deg); }
            72% { transform: scale(0.88) rotate(-1deg); }
            84% { transform: scale(1.08) rotate(0.5deg); }
        }

        .button-rect {
            cursor: pointer;
            fill: white;
            fill-opacity: 0;
        }
    `;

    export interface IBoardTheme {
        accent?: string;
        display?: string;
        pin?: string;
        pinTouched?: string;
        pinActive?: string;
        highContrast?: boolean;
        ledOn?: string;
        ledOff?: string;
        buttonOuter?: string;
        buttonUps: string[];
        buttonDown?: string;
        virtualButtonOuter?: string;
        virtualButtonUp?: string;
        virtualButtonDown?: string;
        lightLevelOn?: string;
        lightLevelOff?: string;
        soundLevelOn?: string;
        soundLevelOff?: string;
    }

    export var themes: IBoardTheme[] = ["#3ADCFE"].map(accent => {
        return {
            accent: accent,
            pin: "#F6C426",
            pinTouched: "#FFA500",
            pinActive: "#E6007D",
            ledOn: "#ff5555",
            ledOff: "#e0e1e2",
            buttonOuter: "#979797",
            buttonUps: ["#186A8C", "#D82E50"],
            buttonDown: "#FFA500",
            virtualButtonDown: "#FFA500",
            virtualButtonOuter: "#333",
            virtualButtonUp: "#fff",
            lightLevelOn: "#555",
            lightLevelOff: "yellow",
            soundLevelOn: "#3ADCFE",
            soundLevelOff: "#555"
        }
    });

    export function randomTheme(highContrast?: boolean): IBoardTheme {
        let theme = themes[Math.floor(Math.random() * themes.length)];
        if (highContrast) {
            theme = JSON.parse(JSON.stringify(theme)) as IBoardTheme;
            theme.highContrast = true;
            theme.ledOff = "#000000";
            theme.ledOn = "#FF0000";
            theme.pin = "#D4AF37";
            theme.accent = "#FFD43A";
        }
        return theme;
    }

	class MiniBoard extends pxsim.BaseBoard {
		hardwareVersion?: number = 3;
	}

	class MiniRuntime extends pxsim.Runtime {
		board: MiniBoard;
	}

    export interface IBoardProps {
        runtime?: MiniRuntime;
        theme?: IBoardTheme;
        wireframe?: boolean;
        disableTilt?: boolean;
    }

    interface EventBinding {
        event: string;
        handler: (ev: Event) => void;
        element?: Element | Document;
    }

    export class MicrobitBoardSvg implements BoardView {
        public element: SVGSVGElement;
        private liveRegionInitialized = false;
        private style: SVGStyleElement;
        private defs: SVGDefsElement;
        private g: SVGGElement;
        private pkg: SVGPathElement;
        private logos: SVGElement[];
        private headg: SVGGElement;
        private head: SVGGElement;
        private headParts: SVGElement;
        private headInitialized = false;
        private heads: SVGElement[];
        private headText: SVGTextElement;
        private display: SVGElement;
        private buttons: SVGElement[];
        private buttonsOuter: SVGElement[];
        // private buttonABText: SVGTextElement;
        private pins: SVGElement[];
        private pinGradients: SVGLinearGradientElement[];
        private pinTexts:{ [key: number]: SVGTextElement };
        private ledsOuter: SVGElement[];
        private leds: SVGElement[];
        private microphoneLed: SVGElement;
        private systemLed: SVGCircleElement;
        private antenna: SVGElement;
        private antennaInitialized = false;
        private rssi: SVGTextElement;
        private lightLevelButton: SVGCircleElement;
        private lightLevelGradient: SVGLinearGradientElement;
        private lightLevelInitialized = false;
        private lightLevelText: SVGTextElement;
        private thermometerGradient: SVGLinearGradientElement;
        private thermometer: SVGRectElement;
        private thermometerInitialized = false;
        private thermometerText: SVGTextElement;
        private soundLevelGradient: SVGLinearGradientElement;
        private soundLevel: SVGRectElement;
        private soundLevelInitialized = false;
        private soundLevelText: SVGTextElement;
        private soundLevelIcon: SVGTextElement;
        private shakeButton: SVGElement;
        private gestureButtons: { [key: number]: { outer: SVGElement, inner: SVGElement, key: string } } = {};
        // gestureControl stores outer group, optional menu, last selected gesture key and a menu-close handler
        private gestureControl: { outer: SVGGElement, menu?: SVGGElement, lastKey?: string, menuCloseHandler?: (ev: any) => void } = undefined;
        // Note: gesture icons are provided by the compile-time GESTURE_JRES constant above.
        private shakeInitialized = false;
        // private shakeText: SVGTextElement;
        // private accTextX: SVGTextElement;
        // private accTextY: SVGTextElement;
        // private accTextZ: SVGTextElement;
        // private v2Circle: SVGCircleElement
        // private v2Text: SVGTextElement;
        public board: pxsim.DalBoard;
        private domHardwareVersion = 1;
<<<<<<< HEAD
        private bindings: EventBinding[] = [];
        private moveHeadingOnClick = (ev: MouseEvent) => {
            let pt = this.element.createSVGPoint();
            let cur = svg.cursorPoint(pt, this.element, ev);
            const logoBounds = this.head.getBBox();
            const logoCenterX = logoBounds.x + (logoBounds.width / 2);
            const logoCenterY = logoBounds.y + (logoBounds.height / 2);
            const distance = Math.sqrt((((cur.y - logoCenterY) ** 2) + ((cur.x - logoCenterX) ** 2)));

            // 30 and 90 are not precise, just numbers that fit nicely with usage
            if (distance > 30 && distance < 90) {
                const state = this.board;
                state.compassState.heading = Math.floor(Math.atan2(cur.y - logoCenterY, cur.x - logoCenterX) * 180 / Math.PI) + 90;
                if (state.compassState.heading < 0) state.compassState.heading += 360;
                this.updateHeading();
            }
        }
=======
        private rgbLed: SVGElement;
		private rgbLedLeft: SVGElement;
		private rgbLedRight: SVGElement;
        private motorRotors: SVGElement[];
        private motorGroups: SVGElement[];
        private buttonGroup: SVGGElement;
        private versionToggle: SVGGElement;
        private pinDragSurfaces: Map<SVGElement> = {};
        private pinNmToCoord: Map<Coord> = {
			"EXT_PWR": [
				92.30997467041016,
				-42.92474937438965
			],
			"SPKR": [
				106.44635391235352,
				-16.370698928833008
			],
			"BTN_A": [
				93.8138427734375,
				56.631452560424805
			],
			"BTN_B": [
				204.92835235595703,
				56.631452560424805
			],
			// rings
			"TOUCH_P0": [
				56.002254486083984,
				95.43130111694336
			],
			"TOUCH_P1": [
				103.00893783569336,
				175.82388305664062
			],
			"TOUCH_P2": [
				195.90512084960938,
				175.3082733154297
			],
			"TOUCH_P3": [
				241.79466247558594,
				95.3883285522461
			],
			"TOUCH_GND": [
				103.00893783569336,
				14.86682915687561
			],
			"TOUCH_VCC": [
				195.64733123779297,
				14.86682915687561
			],
			"C_GND1": [
				113.1493148803711,
				159.83989715576172
			],
			"C_GND2": [
				150.27342987060547,
				159.83989715576172
			],
			"C_GND3": [
				150.27342987060547,
				153.5666275024414
			],
			"C_GND4": [
				187.39752960205078,
				153.5666275024414
			],
			"C_VCC1": [
				187.39752960205078,
				159.83989715576172
			],
			"C_VCC2": [
				113.1922836303711,
				153.5666275024414
			],
			"C_P0": [
				119.33667373657227,
				159.83989715576172
			],
			"C_P2": [
				125.52401733398438,
				159.83989715576172
			],
			"C_P4": [
				131.71136474609375,
				159.83989715576172
			],
			"C_P6": [
				137.89871978759766,
				159.83989715576172
			],
			"C_P8": [
				144.08607482910156,
				159.83989715576172
			],
			"C_P10": [
				156.46077728271484,
				159.83989715576172
			],
			"C_P12": [
				162.64812469482422,
				159.83989715576172
			],
			"C_P14": [
				168.83545684814453,
				159.83989715576172
			],
			"C_P16": [
				175.02281951904297,
				159.83989715576172
			],
			"C_P20": [
				181.2101821899414,
				159.83989715576172
			],
			"C_P1": [
				119.379638671875,
				153.5666275024414
			],
			"C_P3": [
				125.56698226928711,
				153.5666275024414
			],
			"C_P5": [
				131.71136474609375,
				153.5666275024414
			],
			"C_P7": [
				137.89871978759766,
				153.5666275024414
			],
			"C_P9": [
				144.08607482910156,
				153.5666275024414
			],
			"C_P11": [
				156.46077728271484,
				153.5666275024414
			],
			"C_P13": [
				162.64812469482422,
				153.5666275024414
			],
			"C_P15": [
				168.83545684814453,
				153.5666275024414
			],
			"C_P21": [
				175.02281951904297,
				153.5666275024414
			],
			"C_P19": [
				181.2101821899414,
				153.5666275024414
			],
			"M0_GND": [
				137.89871978759766,
				141.70752716064453
			],
			"M1_GND": [
				156.46077728271484,
				141.70752716064453
            ],
            "M_GND": [
				168.83547210693360,
				141.70752716064453
			],
			"M0_OUT": [
				144.08607482910156,
				141.70752716064453
			],
			"M1_OUT": [
				150.27342987060547,
				141.70752716064453
			],
			"M_VM": [
				162.64812469482422,
				141.70752716064453
			],
			"G_A0_GND": [
				82.47036743164062,
				72.35763549804688
			],
			"G_A0_VCC": [
				78.34546279907227,
				76.3106689453125
			],
			"G_A0_SDA": [
				74.65023803710938,
				80.00588989257812
			],
			"G_A0_SCL": [
				70.43940734863281,
				84.21672821044922
			],
			"G_A1_RX": [
				216.52963256835938,
				71.4982795715332
			],
			"G_A1_TX": [
				220.65453338623047,
				75.53724670410156
			],
			"G_A1_VCC": [
				224.34976959228516,
				79.23247528076172
			],
			"G_A1_GND": [
				228.56060028076172,
				83.44330978393555
			],
			// Standard GPIO pin names used by BoardHost for breadboard/parts wiring
			// Mini 3 (board.svg v3) touch ring centers (inner circle center from path data)
			"P0": [163.3, 398.9],  // C_P0 inner row (Steckleiste)
			"P1": [163.3, 381.7],  // C_P1 outer row (Steckleiste)
			"P2": [180.4, 398.9],  // C_P2 inner row (Steckleiste)
			"P3": [180.4, 381.7],  // C_P3 outer row (Steckleiste)
			"GND": [149.7, 398.9], // GND1 inner row, nudged right so +3v3/GND cables don't overlap
			"+3v3": [142.7, 381.7],// VCC outer row, nudged left so +3v3/GND cables don't overlap
			// Mini 3 pin header (Steckleiste) centers — inner row y=398.9, outer row y=381.7
			"P4": [197.8, 398.9],  // C_P4 inner row
			"P5": [197.8, 381.7],  // C_P5 outer row
			"P6": [215.1, 398.9],  // C_P6 inner row
			"P7": [215.1, 381.7],  // C_P7 outer row
			"P8": [232.3, 398.9],  // C_P8 inner row
			"P9": [232.3, 381.7],  // C_P9 outer row
			"P10": [249.5, 398.9], // C_P10 inner row
			"P11": [249.5, 381.7], // C_P11 outer row
			"P12": [266.7, 398.9], // C_P12 inner row
			"P13": [266.7, 381.7], // C_P13 outer row
			"P14": [283.9, 398.9], // C_P14 inner row
			"P15": [283.9, 381.7], // C_P15 outer row
			"P16": [301.1, 398.9], // C_P16 inner row
			"P17": [301.1, 381.7], // C_P17 outer row
			"P18": [318.3, 398.9], // C_P18 inner row
			"P19": [318.3, 381.7], // C_P19 outer row
			"P20": [335.5, 398.9]  // C_P20 inner row
		};
>>>>>>> hugo_wipboehm

        constructor(public props: IBoardProps) {

            this.buildDom();
            if (props && props.wireframe)
                U.addClass(this.element, "sim-wireframe");

            if (props && props.theme)
                this.updateTheme();

            if (props && props.runtime) {
                this.board = this.props.runtime.board as pxsim.DalBoard;
                this.board.updateSubscribers.push(() => this.updateState());
                this.updateState(true);
                this.attachEvents();
            }
        }

        // Play a gesture animation on the main board element.
        // The animation class is derived from the gesture key: e.g. 'shake' -> 'shake_animation'.
        // This centralizes the small remove/add pattern and forces a reflow so animations restart
        // without using setTimeout everywhere.
        private playGestureAnimation(key: string) {
            // console.log("play gesture", key);
            try {
                if (!this.element) return;
                // Apply animation to the root SVG element so all children (including LED matrix) transform
                const boardEl = this.element as Element;
                // Extra safety check: ensure classList exists before using it
                if (!boardEl || !boardEl.classList) {
                    // console.log("playGestureAnimation: boardEl or classList not ready");
                    return;
                }
                const cls = (key ? key : 'shake') + '_animation';
                try {
                    // remove any existing animation classes (anything ending with '_animation')
                    // Add null check before accessing classList
                    if (boardEl.classList) {
                        const existing = Array.from(boardEl.classList).filter(c => c && c.indexOf('_animation') === c.length - '_animation'.length);
                        existing.forEach(c => { try { if (boardEl.classList) boardEl.classList.remove(c); } catch (e) { } });
                    }
                } catch (e) { }
                // force reflow / layout so the animation can restart
                try { boardEl.getBoundingClientRect(); } catch (e) { }
                try {
                    if (boardEl.classList) boardEl.classList.add(cls);
                    // Ensure the animation class is removed once the animation completes,
                    // otherwise CSS animation (with fill-mode: both) will keep overriding
                    // the inline transform used by updateTilt().
                    const onDone = (ev?: any) => {
                        try {
                            if (boardEl) {
                                boardEl.removeEventListener('animationend', onDone as any);
                                boardEl.removeEventListener('animationcancel', onDone as any);
                                boardEl.removeEventListener('webkitAnimationEnd', onDone as any);
                            }
                        } catch (e) { }
                        try { if (boardEl && boardEl.classList) boardEl.classList.remove(cls); } catch (e) { }
                        // Re-apply current tilt transform after animation ends
                        try { this.updateTilt(); } catch (e) { }
                    };
                    if (boardEl) {
                        boardEl.addEventListener('animationend', onDone as any, { once: true } as any);
                        boardEl.addEventListener('animationcancel', onDone as any, { once: true } as any);
                        boardEl.addEventListener('webkitAnimationEnd', onDone as any, { once: true } as any);
                    }
                    // Fallback: ensure cleanup even if animationend isn't fired for some reason
                    setTimeout(onDone, 1500);
                } catch (e) { }
            } catch (e) { }
        }

        public getView(): SVGAndSize<SVGSVGElement> {
            return {
                el: this.element,
                y: 0,
                x: 0,
                w: MB_WIDTH,
                h: MB_HEIGHT
            };
        }

        public getCoord(pinNm: string): Coord {
            // The static map holds Calliope mini v3 positions; when the v2 board is shown, the
            // GPIO header sits elsewhere, so resolve those pins from the v2 coordinate map.
            if (this.domHardwareVersion == 2 && pinCoordsV2[pinNm])
                return pinCoordsV2[pinNm];
            return this.pinNmToCoord[pinNm];
        }

        public highlightPin(pinNm: string): void {
            //TODO: for instructions
        }

        public getPinDist(): number {
            return 10;
        }

        private recordPinCoords() {
			pinNames.forEach((nm, i) => {
				const p = this.pins[i];
				const r = p.getBoundingClientRect();
                this.pinNmToCoord[nm] = [r.left + r.width / 2, r.top + r.height / 2];
            });
        }

<<<<<<< HEAD
        public removeEventListeners() {
            for (const binding of this.bindings) {
                const el = binding.element || document;
                el.removeEventListener(binding.event, binding.handler);
            }

            document.body.removeEventListener(pointerEvents.down[0], this.moveHeadingOnClick);
        }

=======
>>>>>>> hugo_wipboehm
        private updateTheme() {
            let theme = this.props.theme;

            svg.fills(this.leds, theme.ledOn);
            svg.fills(this.ledsOuter, theme.ledOff);
            svg.fills(this.buttonsOuter.slice(6, 8), theme.buttonOuter);
            svg.fill(this.buttons[0], theme.buttonUps[0]);
            svg.fill(this.buttons[1], theme.buttonUps[1]);
            svg.fill(this.buttonsOuter[2], theme.virtualButtonOuter);
            svg.fill(this.buttons[2], theme.virtualButtonUp);
            if (this.shakeButton) svg.fill(this.shakeButton, theme.virtualButtonUp);
            // ensure any gesture buttons are themed like virtual buttons (outer + inner)
            for (const k in this.gestureButtons) {
                try {
                    const rec = this.gestureButtons[k];
                    if (rec && rec.inner) svg.fill(rec.inner, theme.virtualButtonUp);
                    if (rec && rec.outer) {
                        const outerCircle = rec.outer.querySelector('.sim-button-outer') as SVGElement;
                        if (outerCircle) svg.fill(outerCircle, theme.virtualButtonOuter);
                    }
                } catch (e) { }
            }

            this.pinGradients.forEach(lg => svg.setGradientColors(lg, theme.pin, theme.pinActive));
            svg.setGradientColors(this.lightLevelGradient, theme.lightLevelOn, theme.lightLevelOff);
            svg.setGradientColors(this.soundLevelGradient, theme.soundLevelOff, theme.soundLevelOn);
            svg.setGradientColors(this.thermometerGradient, theme.ledOff, theme.ledOn);
        }

<<<<<<< HEAD
        public updateState(initialCall: boolean = false) {
            const state = this.board;
=======
        public updateState() {
            let state = this.board;
>>>>>>> hugo_wipboehm
            if (!state) return;
            let theme = this.props.theme;

            this.updateMicrophone();
            this.updateRecordingActive();
            this.updateButtonPairs();
            this.updateLEDMatrix();
            this.updatePins();
            this.updateTilt();
            this.updateHeading();
            this.updateLightLevel();
            this.updateTemperature();
            this.updateButtonAB();
            this.updateGestures();
            this.bringControlsToFront();
            this.updateRgbLed();
			this.updateMotor();
			this.updateSpeaker();
            this.updateRSSI();

<<<<<<< HEAD
            if (!this.props.runtime || this.props.runtime.dead)
                U.addClass(this.element, "grayscale");
            else
                U.removeClass(this.element, "grayscale");

            if (!initialCall && !this.liveRegionInitialized) {
                // The iframe document's innerHTML is cleared after mkBoardView is called.
                // Ensure that the live region is created after this.
                accessibility.setLiveContent("");
                this.liveRegionInitialized = true;
            }
=======
            if (!runtime || runtime.dead) U.addClass(this.element, "grayscale");
            else U.removeClass(this.element, "grayscale");
        }

        // Keep the gesture/shake control above the breadboard wire layers. The board element is a
        // child of the composition host <svg> alongside the wire layers, so a control inside the
        // board can be overdrawn by wires. Re-parent buttonGroup into the host (last = on top),
        // compensating for the board's offset/scale so the buttons stay in place. No-op without a
        // breadboard host.
        private bringControlsToFront() {
            if (!this.buttonGroup) return;
            const host: any = this.element.parentNode;
            if (!host || !host.tagName || host.tagName.toLowerCase() !== "svg") return;
            if (this.buttonGroup.parentNode !== host) {
                const ax = parseFloat(this.element.getAttribute("x") || "0");
                const ay = parseFloat(this.element.getAttribute("y") || "0");
                const aw = parseFloat((this.element.getAttribute("width") || `${MB_WIDTH}`).replace("px", ""));
                const scale = aw > 0 ? aw / MB_WIDTH : 1;
                this.buttonGroup.setAttribute("transform", `translate(${ax}, ${ay}) scale(${scale})`);
            }
            host.appendChild(this.buttonGroup); // move to end → drawn last → in front of wires
>>>>>>> hugo_wipboehm
        }

        private updateButtonPairs() {
            const state = this.board;
            const theme = this.props.theme;
            const bpState = state.buttonPairState;
            const buttons = [bpState.aBtn, bpState.bBtn, bpState.abBtn];
            buttons.forEach((btn, index) => {
                svg.fill(this.buttons[index], btn.pressed ? (btn.virtual ? theme.virtualButtonDown : theme.buttonDown) : (btn.virtual ? theme.virtualButtonUp : theme.buttonUps[index]));
            });
        }

        private updateLEDMatrix() {
            const state = this.board;
            if (state.ledMatrixState.disabled) {
                this.leds.forEach((led, i) => {
                    const sel = (<SVGStyleElement><any>led)
                    sel.style.opacity = "0";
                })
            } else {
                const bw = state.ledMatrixState.displayMode == pxsim.DisplayMode.bw
                const img = state.ledMatrixState.image;
                const br = state.ledMatrixState.brigthness != undefined ? state.ledMatrixState.brigthness : 255;
                this.leds.forEach((led, i) => {
                    const sel = (<SVGStyleElement><any>led)
                    let imgbr = bw ? (img.data[i] > 0 ? br : 0) : img.data[i];
                    // correct brightness
                    const opacity = imgbr > 0 ? imgbr / 255 * 155 + 100 : 0;
                    const transfrom = imgbr > 0 ? imgbr / 255 * 0.4 + 0.6 : 0;
                    sel.style.opacity = (opacity / 255) + "";
                    if (transfrom > 0) {
                        (sel.style as any).transformBox = 'fill-box';
                        sel.style.transformOrigin = '50% 50%';
                        sel.style.transform = `scale(${transfrom})`;
                    }
                })
            }
        }

        private updateRgbLed() {
			function updateRgbLedVisual(c: number, el: SVGElement) {
                const b = c & 0xFF;
                const g = (c >> 8) & 0xFF;
                const r = (c >> 16) & 0xFF;
                const w = (c >> 24) & 0xFF;
                const ch = `rgba(${r}, ${g}, ${b}, 1)`;
                svg.fill(el, ch);
			}

            let state = this.board;
            if (state.rgbLedState) {
                if (!this.rgbLed)
                    this.rgbLed = this.element.getElementById("rgbledcircle") as SVGCircleElement;
				updateRgbLedVisual(state.rgbLedState, this.rgbLed)
            } else if (this.rgbLed) {
                svg.fill(this.rgbLed, 'white');
            }

			if(this.domHardwareVersion == 3) {
				if (state.rgbLedLeftState) {
					if (!this.rgbLedLeft)
						this.rgbLedLeft = this.element.getElementById("rgbledleftcircle") as SVGCircleElement;
					updateRgbLedVisual(state.rgbLedLeftState, this.rgbLedLeft)
				} else if (this.rgbLedLeft) {
					svg.fill(this.rgbLedLeft, 'white');
				}

				if (state.rgbLedRightState) {
					if (!this.rgbLedRight)
						this.rgbLedRight = this.element.getElementById("rgbledrightcircle") as SVGCircleElement;
					updateRgbLedVisual(state.rgbLedRightState, this.rgbLedRight)
				} else if (this.rgbLedRight) {
					svg.fill(this.rgbLedRight, 'white');
				}
			}
        }

        // Motor driver visualization (Calliope mini v3 dual H-bridge).
        // Reads the motor pins written by motors.dualMotorPower():
        //   M0 speed=M_A_IN2(153) dir=M_A_IN1(152), M1 speed=M_B_IN2(155) dir=M_B_IN1(154).
        // Draws a motor body with cables plugged into the M0/M1 +/- pads; the rotor
        // spins with speed proportional to |power| and direction from the DIR pin.
        // Body positions are easy to tweak — adjust bodyX/bodyY below.
        private updateMotor() {
            const state = this.board;
            if (!state) return;
            const ec = state.edgeConnectorState;
            if (!ec) return;

            if (!this.motorRotors) { this.motorRotors = []; this.motorGroups = []; }

            // Calliope mini v1/v2 has a single bidirectional motor on one DRV8837, not the v3 dual
            // H-bridge, so the v2 board shows one motor wired across M0+ and M0-.
            if (this.domHardwareVersion == 2) {
                this.updateSingleMotor(ec, state);
                return;
            }

            // plus/minus are the M0±/M1± Steckleiste pad centers (rect xy + 7.5), hardcoded so
            // the cables reliably plug into the header (getBBox can return 0 before layout).
            // M0 is on the inner row (y=398.9), M1 on the outer row (y=381.7); both rows share the
            // same x, so when both motors are shown their cables would run on top of each other near
            // the header. Nudge the pads apart in x (same trick as the GND/+3v3 split): M0's pads go
            // left and M1's go right, matching their body order (M0 bodyX=400, M1 bodyX=475) so the
            // cables stay separated and don't cross.
            const MOTORS = [
                { speedPin: DAL.MICROBIT_ID_IO_M_A_IN2, dirPin: DAL.MICROBIT_ID_IO_M_A_IN1, plus: [351, 398.9], minus: [367, 398.9], bodyX: 400, bodyY: 580, label: "M0" },
                { speedPin: DAL.MICROBIT_ID_IO_M_B_IN2, dirPin: DAL.MICROBIT_ID_IO_M_B_IN1, plus: [355, 381.7], minus: [371, 381.7], bodyX: 475, bodyY: 580, label: "M1" }
            ];

            MOTORS.forEach((m, i) => {
                const speedPin = ec.getPin(m.speedPin);
                const dirPin = ec.getPin(m.dirPin);
                // Shown from sim start, per channel: M0 (i=0) / M1 (i=1) only if its block is used.
                const used = !!(state.motorUsed && state.motorUsed[i]);

                // Build this motor's graphics lazily, once the program is known to use this channel.
                if (used && !this.motorGroups[i]) this.buildMotor(m, i);

                const g = this.motorGroups[i];
                const rotor = this.motorRotors[i];
                if (!g || !rotor) return;
                g.style.display = used ? "" : "none";
                if (!used) { rotor.style.animation = ""; return; }

                const speed = speedPin ? Math.min(1023, Math.abs(speedPin.value || 0)) : 0;
                const frac = speed / 1023;
                const reverse = dirPin ? (dirPin.value || 0) > 0 : false;
                if (frac <= 0.001) {
                    rotor.style.animation = "";
                } else {
                    // full power ~0.2s/turn, low power ~1.8s/turn
                    const dur = (0.2 + (1 - frac) * 1.6).toFixed(2);
                    rotor.style.animation = `sim-motor-spin ${dur}s linear infinite`;
                    rotor.style.animationDirection = reverse ? "reverse" : "normal";
                }
            });
        }

        // Calliope mini v1/v2 single-motor visualization. One bidirectional motor on the shared
        // DRV8837 is wired across the M0+ pad and the M0- pad (silk-screened M1+). The "motor at
        // %" block (motors.motorPower -> driveSingleMotorDal) drives M0_DIR for forward and
        // M1_DIR for reverse, so the active pin gives the speed and which one gives the direction.
        private updateSingleMotor(ec: pxsim.EdgeConnectorState, state: pxsim.DalBoard) {
            // Only the v1/v2 single-motor block (motors.motorPower) shows a motor on the v2 board.
            // The v3 dualMotorPower block deliberately shows nothing here, even though both drive
            // the same DRV8837 pins at runtime — the distinction is which block the program uses.
            const show = !!state.singleMotorUsed;

            // M0+ pad and M0- pad (silk M1+) centres in the v2 artwork; body sits below, centred.
            const M0PLUS = [239.4, 389.3], M0MINUS = [255.8, 391.7];
            if (show && !this.motorGroups[0])
                this.buildMotor({ plus: M0PLUS, minus: M0MINUS, bodyX: 247, bodyY: 560, label: "M0" }, 0);

            const g = this.motorGroups[0];
            const rotor = this.motorRotors[0];
            if (!g || !rotor) return;
            g.style.display = show ? "" : "none";
            if (!show) { rotor.style.animation = ""; return; }

            // driveSingleMotorDal writes the PWM duty to M0_DIR (forward) or M1_DIR (reverse);
            // the active pin gives the speed, which one is active gives the direction.
            const fwdPin = ec.getPin(DAL.MICROBIT_ID_IO_M_A_IN1); // M0_DIR: forward PWM
            const revPin = ec.getPin(DAL.MICROBIT_ID_IO_M_B_IN1); // M1_DIR: reverse PWM
            const fwd = fwdPin ? Math.abs(fwdPin.value || 0) : 0;
            const rev = revPin ? Math.abs(revPin.value || 0) : 0;
            const speed = Math.min(1023, Math.max(fwd, rev));
            const frac = speed / 1023;
            const reverse = rev > fwd;
            if (frac <= 0.001) {
                rotor.style.animation = "";
            } else {
                const dur = (0.2 + (1 - frac) * 1.6).toFixed(2);
                rotor.style.animation = `sim-motor-spin ${dur}s linear infinite`;
                rotor.style.animationDirection = reverse ? "reverse" : "normal";
            }
        }

        // Draws one motor: a housing + spinning rotor, with red(+)/black(-) cables plugged
        // into the matching M0+/M0- (or M1+/M1-) pads of the Steckleiste.
        private buildMotor(m: { plus: number[], minus: number[], bodyX: number, bodyY: number, label: string }, i: number) {
            const plus = { x: m.plus[0], y: m.plus[1] };
            const minus = { x: m.minus[0], y: m.minus[1] };

            const g = svg.child(this.g, "g", { class: "sim-motor" }) as SVGGElement;
            // terminals on the top of the housing (the motor sits well below the Steckleiste)
            const tPlus = { x: m.bodyX - 12, y: m.bodyY - 28 };
            const tMinus = { x: m.bodyX + 12, y: m.bodyY - 28 };
            // cables first (so the housing covers their ends): red = +, black = -. Vertical S-curve.
            svg.child(g, "path", { class: "sim-motor-cable", stroke: "#d7263d", "stroke-width": 3,
                d: `M${plus.x},${plus.y} C ${plus.x},${(plus.y + tPlus.y) / 2} ${tPlus.x},${(plus.y + tPlus.y) / 2} ${tPlus.x},${tPlus.y}` });
            svg.child(g, "path", { class: "sim-motor-cable", stroke: "#222222", "stroke-width": 3,
                d: `M${minus.x},${minus.y} C ${minus.x},${(minus.y + tMinus.y) / 2} ${tMinus.x},${(minus.y + tMinus.y) / 2} ${tMinus.x},${tMinus.y}` });
            // housing
            svg.child(g, "circle", { cx: m.bodyX, cy: m.bodyY, r: 27, fill: "#3a3a40", stroke: "#1c1c20", "stroke-width": 2 });
            // rotor (the spinning part)
            const rotor = svg.child(g, "g", { class: "sim-motor-rotor" }) as SVGGElement;
            svg.child(rotor, "rect", { x: m.bodyX - 23, y: m.bodyY - 3.5, width: 46, height: 7, rx: 2, fill: "#c9ccce" });
            svg.child(rotor, "rect", { x: m.bodyX - 3.5, y: m.bodyY - 23, width: 7, height: 46, rx: 2, fill: "#9aa0a3" });
            svg.child(g, "circle", { cx: m.bodyX, cy: m.bodyY, r: 5, fill: "#1c1c20" });
            // label
            const t = svg.child(g, "text", { x: m.bodyX, y: m.bodyY + 44, class: "sim-text centered" }) as SVGTextElement;
            t.setAttribute("text-anchor", "middle");
            t.textContent = m.label;

            this.motorGroups[i] = g;
            this.motorRotors[i] = rotor;
        }

		private updateSpeaker() {
            let state = this.board;
			if (state.speakerState.frequency) {

			} else {

			}
		}

        private updateGestures() {
            let state = this.board;
            if (!state || !state.accelerometerState) return;

            // Use the compile-time/in-file GESTURE_JRES constant for gesture icons.
            // This removes dynamic require()/fetch/embedded lookup complexity and
            // ensures the icons are available at runtime when the file is bundled.
            let gesturesRes: any = (typeof GESTURE_JRES !== 'undefined') ? GESTURE_JRES : undefined;

            // Fallback map of keys to empty string if resource not available
            const iconFor = (key: string) => (gesturesRes && gesturesRes[key] && gesturesRes[key].icon) ? gesturesRes[key].icon : "";

            // Gesture list and their DAL numeric ids (match libs/core/input.cpp Gesture enum)
            const gestures: { key: string, id: number }[] = [
                { key: "shake", id: DAL.MICROBIT_ACCELEROMETER_EVT_SHAKE },
                { key: "tiltforward", id: DAL.MICROBIT_ACCELEROMETER_EVT_TILT_UP },
                { key: "tiltbackwards", id: DAL.MICROBIT_ACCELEROMETER_EVT_TILT_DOWN },
                { key: "frontsideup", id: DAL.MICROBIT_ACCELEROMETER_EVT_FACE_UP },
                { key: "backsideup", id: DAL.MICROBIT_ACCELEROMETER_EVT_FACE_DOWN },
                { key: "tiltleft", id: DAL.MICROBIT_ACCELEROMETER_EVT_TILT_LEFT },
                { key: "tiltright", id: DAL.MICROBIT_ACCELEROMETER_EVT_TILT_RIGHT },
                { key: "freefall", id: DAL.MICROBIT_ACCELEROMETER_EVT_FREEFALL },
                { key: "impact3g", id: DAL.MICROBIT_ACCELEROMETER_EVT_3G },
                { key: "impact6g", id: DAL.MICROBIT_ACCELEROMETER_EVT_6G },
                { key: "impact8g", id: DAL.MICROBIT_ACCELEROMETER_EVT_8G }
            ];

            // layout: compute visible gestures from accelerometerState.usedGestures
            const used = state.accelerometerState.usedGestures || {};
            const visible = gestures.filter(g => used[g.id]);

            // const boardEl = this.element.getElementById("calliope_mini");

            // When there are no visible gestures, remove/hide the gesture control
            if (visible.length == 0) {
                if (this.gestureControl) {
                    try { this.gestureControl.outer.style.visibility = "hidden"; } catch (e) { }
                    if (this.gestureControl.menu) this.gestureControl.menu.style.visibility = "hidden";
                }
                return;
            }

            // place the gesture control next to the A+B button outer if present
            // find A+B outer bbox (this.buttonsOuter[2] expected)
            
            // Check if A+B button is visible
            const isABVisible = this.buttonsOuter && this.buttonsOuter.length > 2 && 
                               (this.buttonsOuter[2] as any).style.visibility !== "hidden";
            
            // Calculate centered positioning
            const buttonWidth = 160; // fixed button width for consistency
            const buttonGap = 12;
            let abX = 100, abY = MB_HEIGHT - 90;
            
            if (isABVisible) {
                // Both buttons visible - center them together
                const totalWidth = buttonWidth + buttonGap + buttonWidth;
                const startX = (MB_WIDTH - totalWidth) / 2;
                
                // Position A+B button
                try {
                    const abEl = this.buttonsOuter[2] as SVGGraphicsElement;
                    const bb = abEl.getBBox();
                    // Move A+B button to the left position
                    const currentX = bb.x;
                    const targetX = startX;
                    const offsetX = targetX - currentX;
                    abEl.setAttribute('transform', `translate(${offsetX}, 0)`);
                    
                    // Gesture button goes to the right
                    abX = startX + buttonWidth + buttonGap;
                } catch (e) {
                    // Fallback to default positioning
                    abX = 100;
                }
            } else {
                // Only gesture button visible - center it alone
                abX = (MB_WIDTH - buttonWidth) / 2;
            }
            
            try {
                if (this.buttonsOuter && this.buttonsOuter.length > 2) {
                    const abEl = this.buttonsOuter[2] as SVGGraphicsElement;
                    const bb = abEl.getBBox();
                    // abX is already calculated above
                    // abY = bb.y;
                }
            } catch (e) { }

            // helper to create a control button using foreignObject (same style as A+B)
            // extraHtml can contain a caret or other adornment to be appended inside the button
            // create a control button using foreignObject (same style as A+B)
            // If `split` is true, a two-part control is created: left action + right dropdown
            const makeControlBtn = (left: number, top: number, key: string, id: number, extraHtml: string = "", split: boolean = false, leftKey?: string, rightKey?: string, width: number | string = buttonWidth) => {
                // gesture key is a dynamic display string; localization needs a string literal, so use it directly
                const aria = key;
                const icon = iconFor(key);

                let btng = svg.child(this.g, "g", { class: "sim-button-group" });
                var fo = svg.child(btng, "foreignObject");
                fo.setAttribute("x", left + "");
                fo.setAttribute("y", top + "");
                // match mkBtn sizes (A+B) so the control looks like the bottom button
                const w = typeof width === 'number' ? `${width}px` : width;
                fo.setAttribute("width", w);
                fo.setAttribute("height", "84px");

                if (!split) {
                    fo.innerHTML = `<body xmlns="http://www.w3.org/1999/xhtml" style="margin:0;padding:0;background:transparent;">
                        <button class="simEventBtn simGestureBtn" aria-label="${aria}">${icon ? `<img src="${icon}" alt="" aria-hidden="true" style="width:84px;height:84px;display:block;">` : aria}${extraHtml}</button>
                    </body>`;
                } else {
                    // leftKey: the gesture key to show on left (active action)
                    const lkey = leftKey || key;
                    const rkey = rightKey || key;
                    const licon = iconFor(lkey);
                    const raria = rkey;
                    fo.innerHTML = `<body xmlns="http://www.w3.org/1999/xhtml" style="margin:0;padding:0;background:transparent;">
                        <div class="sim-gesture-split">
                          <button class="simEventBtn simGestureBtn simGestureLeft" aria-label="${raria}">${licon ? `<img src="${licon}" alt="" aria-hidden="true" style="width:84px;height:84px;display:block;">` : raria}</button>
                          <button class="simEventBtn simGestureBtn simGestureRight" aria-label="${raria}">${extraHtml || `<span class="sim-gesture-caret" aria-hidden="true">▾</span>`}</button>
                        </div>
                      </body>`;
                }

                return btng as SVGGElement;
            }

            // ensure gestureControl exists
            if (!this.gestureControl) {
                this.gestureControl = { outer: mkBtnSvg([0,0]).el as SVGGElement };
                U.addClass(this.gestureControl.outer, 'sim-button-group');
                this.buttonGroup.appendChild(this.gestureControl.outer);
            }

            // Single visible gesture -> one button; multiple -> dropdown
            if (visible.length == 1) {
                const g = visible[0];
                const left = abX;
                const top = abY;
                // replace existing group with a control button
                const el = makeControlBtn(left, top, g.key, g.id);
                // replace gestureControl.outer in DOM
                try { this.buttonGroup.replaceChild(el, this.gestureControl.outer); } catch (e) {
                    try { this.buttonGroup.appendChild(el); } catch (e) { }
                }
                this.gestureControl.outer = el;
                // click handler
                svg.buttonEvents(this.gestureControl.outer,
                    ev => { },
                    ev => {
                        // record last used gesture
                        try { this.gestureControl.lastKey = g.key; } catch (e) { }
                        if (g && g.key) this.playGestureAnimation(g.key);
                        this.board.bus.queue(DAL.MICROBIT_ID_GESTURE, g.id);
                    },
                    ev => { }
                )
                if (this.gestureControl.menu) {
                    // restore previous behavior: hide the menu when switching to single-button
                    try { this.gestureControl.menu.style.visibility = 'hidden'; } catch (e) { }
                    // restore pin event surfaces
                    try {
                        for (const k in this.pinDragSurfaces) {
                            try { (this.pinDragSurfaces as any)[k].style.pointerEvents = 'auto'; } catch (e) { }
                        }
                    } catch (e) { }
                }
            } else {
                // multiple gestures: dropdown
                const left = abX;
                const top = abY;
                // create main dropdown button. show caret and label based on last used gesture when available
                const lastKey = this.gestureControl && this.gestureControl.lastKey ? this.gestureControl.lastKey : visible[0].key;
                const caretHtml = `<span class="sim-gesture-caret" aria-hidden="true">▾</span>`;
                // create a split control: left shows active gesture; right toggles dropdown
                const main = makeControlBtn(left, top, lastKey + '_multi', -1, caretHtml, true, lastKey, lastKey + '_drop', buttonWidth);
                try { this.buttonGroup.replaceChild(main, this.gestureControl.outer); } catch (e) { this.buttonGroup.appendChild(main); }
                this.gestureControl.outer = main;

                // helper to find left/right buttons and attach handlers; used initially and after rebuilding
                const attachSplitHandlers = (root: SVGGElement) => {
                    const fo = root.querySelector('foreignObject');
                    if (!fo) return;
                    const left = fo.querySelector('.simGestureLeft') as HTMLElement;
                    const right = fo.querySelector('.simGestureRight') as HTMLElement;

                    if (left) {
                        // Add touch event handlers for iOS/iPad
                        left.addEventListener('touchstart', (ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                        }, { passive: false });
                        
                        left.addEventListener('touchend', (ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            left.click();
                        }, { passive: false });
                        
                        left.addEventListener('click', (ev) => {
                            // prevent bubbling to any outer handlers
                            try { ev.stopPropagation(); ev.preventDefault(); } catch (e) { }
                            const key = this.gestureControl && this.gestureControl.lastKey ? this.gestureControl.lastKey : lastKey;
                            const g = visible.find(x => x.key == key) || visible[0];
                            try { this.gestureControl.lastKey = key; } catch (e) { }
                            if (g && g.key) this.playGestureAnimation(g.key);
                            if (g) this.board.bus.queue(DAL.MICROBIT_ID_GESTURE, g.id);
                        });
                    }
<<<<<<< HEAD
                );
                accessibility.setAria(this.shakeButton, "button", pxsim.localization.lf("Shake"));
                this.shakeText = svg.child(this.g, "text", { x: 420, y: 122, class: "sim-text-small", "aria-hidden": true }) as SVGTextElement;
                this.shakeText.textContent = "SHAKE";
=======

                    if (right) {
                        // Simplified toggle logic - directly in touchend/click
                        const toggleMenu = () => {
                            const visibleNow = menu.style.visibility == 'visible';
                            if (visibleNow) {
                                menu.style.visibility = 'hidden';
                                // re-enable pin event surfaces when menu hidden
                                try {
                                    for (const k in this.pinDragSurfaces) {
                                        try { (this.pinDragSurfaces as any)[k].style.pointerEvents = 'auto'; } catch (e) { }
                                    }
                                } catch (e) { }
                                if (this.gestureControl.menuCloseHandler) {
                                    document.removeEventListener('pointerdown', this.gestureControl.menuCloseHandler);
                                    document.removeEventListener('touchstart', this.gestureControl.menuCloseHandler);
                                    this.gestureControl.menuCloseHandler = undefined;
                                }
                            } else {
                                menu.style.visibility = 'visible';
                                
                                // Safari fix: recalculate and apply scale every time menu opens
                                try {
                                    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                                    if (isSafari && this.element) {
                                        // Get the actual rendered size of the SVG
                                        const svgRect = this.element.getBoundingClientRect();
                                        const svgScale = svgRect.width / MB_WIDTH; // actual width / viewBox width
                                        
                                        // Apply scale to the dropdown content
                                        const dropdownDiv = menu.querySelector('.sim-gesture-dropdown') as HTMLElement;
                                        if (dropdownDiv) {
                                            if (svgScale < 1) {
                                                dropdownDiv.style.transform = `scale(${svgScale})`;
                                                console.log('Safari scaling applied on open:', svgScale);
                                            } else {
                                                dropdownDiv.style.transform = '';
                                            }
                                        }
                                    }
                                } catch (e) {
                                    console.error('Error applying Safari scale fix on open:', e);
                                }
                                // disable pin event surfaces while menu is open so underlying pins don't intercept clicks
                                try {
                                    for (const k in this.pinDragSurfaces) {
                                        try { (this.pinDragSurfaces as any)[k].style.pointerEvents = 'none'; } catch (e) { }
                                    }
                                } catch (e) { }
                                // only attach a new handler if one isn't already installed
                                if (!this.gestureControl.menuCloseHandler) {
                                    const handler = (ev: PointerEvent | TouchEvent) => {
                                        try {
                                            const target = ev.target as Node | null;
                                            let clickedInside = false;
                                            if (target) {
                                                try {
                                                    if (menu && menu.contains && menu.contains(target)) clickedInside = true;
                                                    else if (this.gestureControl && this.gestureControl.outer && (this.gestureControl.outer as Node).contains && (this.gestureControl.outer as Node).contains(target)) clickedInside = true;
                                                    else {
                                                        const elAsAny = target as any;
                                                        if (elAsAny && elAsAny.closest && elAsAny.closest('.sim-gesture-menu')) clickedInside = true;
                                                    }
                                                } catch (e) { }
                                            }
                                            if (!clickedInside) {
                                                menu.style.visibility = 'hidden';
                                                // restore pin surfaces when closing menu from outside click
                                                try {
                                                    for (const k in this.pinDragSurfaces) {
                                                        try { (this.pinDragSurfaces as any)[k].style.pointerEvents = 'auto'; } catch (e) { }
                                                    }
                                                } catch (e) { }
                                                if (this.gestureControl.menuCloseHandler) {
                                                    document.removeEventListener('pointerdown', this.gestureControl.menuCloseHandler);
                                                    document.removeEventListener('touchstart', this.gestureControl.menuCloseHandler);
                                                    this.gestureControl.menuCloseHandler = undefined;
                                                }
                                            }
                                        } catch (e) { }
                                    };
                                    // add the document handler asynchronously so it doesn't catch the same click that opened the menu
                                    this.gestureControl.menuCloseHandler = handler;
                                    setTimeout(() => {
                                        document.addEventListener('pointerdown', handler);
                                        document.addEventListener('touchstart', handler);
                                    }, 100);
                                }
                            }
                        };
                        
                        // iOS: use touchend directly
                        right.addEventListener('touchend', (ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            toggleMenu();
                        }, { passive: false });
                        
                        // Desktop: use click
                        right.addEventListener('click', (ev) => {
                            ev.stopPropagation();
                            ev.preventDefault();
                            toggleMenu();
                        });
                    }
                };

                // attach handlers to the newly created split control
                try { attachSplitHandlers(this.gestureControl.outer); } catch (e) { }

                // If we already have a menu from a previous render, reuse it so visibility
                // and the outside-click handler are preserved across renders. Otherwise
                // create a new menu group above the button.
                let menu: SVGGElement;
                let menuWasNew = false;
                if (this.gestureControl.menu) {
                    menu = this.gestureControl.menu;
                    // detach any existing children (we will rebuild items) but keep visibility
                    while (menu.firstChild) menu.removeChild(menu.firstChild);
                } else {
                    menu = svg.child(this.buttonGroup, 'g') as SVGGElement;
                    U.addClass(menu, 'sim-gesture-menu');
                    this.gestureControl.menu = menu;
                    menuWasNew = true;
                }
                
                const itemHeight = 86;
                const gap = 8;
                const btnWidth = 120;
                const columns = 3;
                const rows = Math.ceil(visible.length / columns);
                const totalGridWidth = columns * btnWidth + (columns - 1) * gap;
                const totalGridHeight = rows * itemHeight + (rows - 1) * gap;
                const padding = 16;
                
                // Total menu dimensions
                const menuWidth = totalGridWidth + padding * 2;
                const menuHeight = totalGridHeight + padding * 2;
                
                const mainControlWidth = buttonWidth;
                const menuOffsetX = left + Math.round((mainControlWidth - menuWidth) / 2);
                const menuOffsetY = top - menuHeight - 8;

                // Create a single foreignObject for the entire dropdown
                const dropdownFO = svg.child(menu, 'foreignObject', {
                    x: `${menuOffsetX}`,
                    y: `${menuOffsetY}`,
                    width: `${menuWidth}`,
                    height: `${menuHeight}`
                }) as any;
                
                // Build HTML content for dropdown
                let gridItemsHTML = '';
                visible.forEach((g, idx) => {
                    const icon = iconFor(g.key);
                    // gesture key is a dynamic display string; localization needs a string literal, so use it directly
                    const aria = g.key;
                    gridItemsHTML += `
                        <button class="sim-gesture-dropdown-item" data-gesture-id="${g.id}" data-gesture-key="${g.key}" aria-label="${aria}">
                            ${icon ? `<img src="${icon}" alt="${aria}" />` : aria}
                        </button>
                    `;
                });
                
                dropdownFO.innerHTML = `
                    <body xmlns="http://www.w3.org/1999/xhtml" class="sim-gesture-dropdown-container">
                        <div class="sim-gesture-dropdown">
                            <div class="sim-gesture-dropdown-grid">
                                ${gridItemsHTML}
                            </div>
                        </div>
                    </body>
                `;
                
                // Attach event handlers to gesture items
                try {
                    const items = dropdownFO.querySelectorAll('.sim-gesture-dropdown-item');
                    items.forEach((item: HTMLButtonElement) => {
                        const handleGesture = () => {
                            const gestureId = parseInt(item.getAttribute('data-gesture-id') || '0');
                            const gestureKey = item.getAttribute('data-gesture-key') || '';
                            try { this.gestureControl.lastKey = gestureKey; } catch (e) { }
                            if (gestureKey) this.playGestureAnimation(gestureKey);
                            this.board.bus.queue(DAL.MICROBIT_ID_GESTURE, gestureId);
                            menu.style.visibility = 'hidden';
                            
                            // Update split main control to reflect lastKey
                            try {
                                const newMain = makeControlBtn(left, top, (this.gestureControl.lastKey || visible[0].key) + '_multi', -1, caretHtml, true, (this.gestureControl.lastKey || visible[0].key), (this.gestureControl.lastKey || visible[0].key) + '_drop', buttonWidth);
                                try { this.buttonGroup.replaceChild(newMain, this.gestureControl.outer); } catch (e) { }
                                this.gestureControl.outer = newMain;
                                try { attachSplitHandlers(this.gestureControl.outer); } catch (e) { }
                            } catch (e) { }
                            
                            if (this.gestureControl.menuCloseHandler) {
                                document.removeEventListener('pointerdown', this.gestureControl.menuCloseHandler);
                                document.removeEventListener('touchstart', this.gestureControl.menuCloseHandler);
                                this.gestureControl.menuCloseHandler = undefined;
                            }
                        };
                        
                        // iOS: use touchend
                        item.addEventListener('touchend', (ev) => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            handleGesture();
                        }, { passive: false });
                        
                        // Desktop: use click
                        item.addEventListener('click', (ev) => {
                            ev.stopPropagation();
                            ev.preventDefault();
                            handleGesture();
                        });
                    });
                } catch (e) {
                    console.error('Error attaching gesture item handlers:', e);
                }

                // Remove old implementation below - replaced with HTML dropdown above
                
                // hide menu by default only if it was just created; if we're reusing
                // an existing menu preserve its visibility so it stays open across renders.
                if (menuWasNew) menu.style.visibility = 'hidden';
                this.gestureControl.menu = menu;
                // Toggle is handled by the split-control's right button; no outer-group handler here.
>>>>>>> hugo_wipboehm
            }
        }

        private updateMicrophone() {
            const b = board();
            if (!b || !b.microphoneState.sensorUsed) return;
            this.updateSoundLevel();
        }

        private updateRecordingActive() {
            const b = board();
            if (!b)
                return;

            let theme = this.props.theme;
            if (this.microphoneLed) {
                if (b.recordingState.currentlyRecording || b.microphoneState.soundLevelRequested) {
                    svg.fills([this.microphoneLed], theme.ledOn);
                    svg.filter(this.microphoneLed, `url(#ledglow)`);
                } else if (!(b.microphoneState.onSoundRegistered || b.microphoneState.soundLevelRequested)) {
                    svg.fills([this.microphoneLed], theme.ledOff);
                    svg.filter(this.microphoneLed, `url(#none)`);
                }
            }
        }

        private updateButtonAB() {
            let state = this.board;
            if (state.buttonPairState.usesButtonAB && (<any>this.buttons[2]).style.visibility != "visible") {
                (<any>this.buttonsOuter[2]).style.visibility = "visible";
                (<any>this.buttons[2]).style.visibility = "visible";
                this.updateTheme();
            }
        }

        private updateRSSI() {
            let state = this.board;
            if (!state) return;
            const v = state.radioState.datagram.rssi;
            if (v === undefined) return;

            if (!this.rssi) {
                let ax = 380;
                let dax = 18;
                let ayt = 10;
                let ayb = 40;
                const wh = dax * 5;
                for (let i = 0; i < 4; ++i)
                    svg.child(this.g, "rect", { x: ax - 90 + i * 6, y: ayt + 28 - i * 4, width: 4, height: 2 + i * 4, fill: "#fff" })
                this.rssi = svg.child(this.g, "text", { x: ax - 64, y: ayb, class: "sim-text" }) as SVGTextElement;
                this.rssi.textContent = "";
            }

            const vt = v.toString();
            if (vt !== this.rssi.textContent) {
                this.rssi.textContent = v.toString();
                this.antenna.setAttribute("aria-valuenow", this.rssi.textContent);
                accessibility.setLiveContent(this.rssi.textContent);
            }
        }

        private updatePin(pin: Pin, index: number) {
            if (!pin) return;

            const element = this.pinDragSurfaces[pin.id];
            let text = this.pinTexts[pin.id];
            let v = "";
<<<<<<< HEAD
            let ariaValueNow: number;
            if (pin.mode & PinFlags.Analog) {
                v = Math.floor(100 - (pin.value || 0) / 1023 * 100) + "%";
                if (text) text.textContent = (pin.period ? "~" : "") + (pin.value || 0) + "";
                ariaValueNow = pin.value ?? 0;
            }
            else if (pin.mode & PinFlags.Digital) {
                v = pin.value > 0 ? "0%" : "100%";
                if (text) text.textContent = pin.value > 0 ? "1" : "0";
                ariaValueNow = pin.value > 0 ? 1 : 0;
=======

            if (pin.mode & PinFlags.Analog) {
                v = Math.floor(100 - (pin.value || 0) / 1023 * 100) + "%";
                if (text) {
                    if (pin.pitch && pin.period) {
                        text.textContent = "\u266A"; // musical note — audio pitch output
                    } else {
                        text.textContent = (pin.period ? "~" : "") + (pin.value || 0) + "";
                    }
                }
            }
            else if (pin.mode & PinFlags.Digital) {
                v = pin.value > 511 ? "0%" : "100%";
                if (text) text.textContent = pin.value > 511 ? "1" : "0";
>>>>>>> hugo_wipboehm
            }
            else if (pin.mode & PinFlags.Touch) {
                v = pin.touched ? "0%" : "100%";
                if (text) text.textContent = v;
            } else {
                v = "100%";
                if (text) text.textContent = "";
            }
            if (v) svg.setGradientValue(this.pinGradients[index], v);

<<<<<<< HEAD
            if (pin.mode !== PinFlags.Unused) {
                accessibility.makeFocusable(this.pins[index]);
                if (pin.mode & PinFlags.Touch) {
                    this.pins[index].setAttribute("role", "button");
                    this.pins[index].ariaLabel = this.pins[index].firstChild.textContent
                    this.pins[index].removeAttribute("aria-valuemin");
                    this.pins[index].removeAttribute("aria-valuemax");
                    this.pins[index].removeAttribute("aria-orientation");
                    this.pins[index].removeAttribute("aria-valuenow");
                    this.pins[index].removeAttribute("aria-valuetext");
                    this.pins[index].removeAttribute("aria-readonly");
                } else {
                    this.pins[index].setAttribute("role", "slider");
                    this.pins[index].ariaLabel = this.pins[index].firstChild.textContent;
                    this.pins[index].setAttribute("aria-valuemin", "0");
                    this.pins[index].setAttribute("aria-valuemax", pin.mode & PinFlags.Analog ? "1023" : "1");
                    this.pins[index].setAttribute("aria-orientation", "vertical");
                    this.pins[index].setAttribute("aria-valuenow", ariaValueNow.toString() ?? "");
                    // Check that the text content isn't just a plain int and only set aria-valuetext if required.
                    if (text?.textContent && text?.textContent !== parseInt(text?.textContent).toString()) {
                        this.pins[index].setAttribute("aria-valuetext", text.textContent);
                    } else {
                        this.pins[index].removeAttribute("aria-valuetext");
                    }
                    if (pin.mode & PinFlags.Input) {
                        this.pins[index].removeAttribute("aria-readonly");
                    } else {
                        this.pins[index].setAttribute("aria-readonly", "true");
                    }
                }
=======
            if (pin.mode !== PinFlags.Unused && element) {
                accessibility.makeFocusable(element);
                accessibility.setAria(element, "slider", element.firstChild.textContent);
                element.setAttribute("aria-valuemin", "0");
                element.setAttribute("aria-valuemax", pin.mode & PinFlags.Analog ? "1023" : "100");
                element.setAttribute("aria-orientation", "vertical");
                element.setAttribute("aria-valuenow", text ? text.textContent : v);
                accessibility.setLiveContent(text ? text.textContent : v);
>>>>>>> hugo_wipboehm
            }
        }

        private updateTemperature() {
            let state = this.board;
            if (!state || !state.thermometerState.usesTemperature) return;

            let tmin = -5;
            let tmax = 50;
<<<<<<< HEAD
            if (!this.thermometerInitialized) {
                this.thermometerInitialized = true;
                this.thermometer.style.visibility = "visible";
                this.thermometerText = svg.child(this.g, "text", { class: 'sim-text', x: 58, y: 130, "aria-hidden": true }) as SVGTextElement;
                if (this.props.runtime)
                    this.props.runtime.environmentGlobals[pxsim.localization.lf("temperature")] = state.thermometerState.temperature;
=======
            if (!this.thermometer) {
                let gid = "gradient-thermometer";
                this.thermometerGradient = svg.linearGradient(this.defs, gid);
				const ty = MB_HEIGHT - 270;
                this.thermometer = <SVGRectElement>svg.child(this.g, "rect", {
                    class: "sim-thermometer",
                    x: 0,
                    y: ty,
                    width: 30,
                    height: 160,
                    rx: 5,
                    ry: 5,
                    fill: `url(#${gid})`
                });
                this.thermometerText = svg.child(this.g, "text", {
					class: 'sim-text big inverted centered',
					x: 15,
                    y: ty + 190
				}) as SVGTextElement;
>>>>>>> hugo_wipboehm
                this.updateTheme();

                let pt = this.element.createSVGPoint();
                svg.buttonEvents(this.thermometer,
                    // move
                    (ev) => {
                        let cur = svg.cursorPoint(pt, this.element, ev);
                        let t = Math.max(0, Math.min(1, (cur.y - ty) / 160))
                        state.thermometerState.temperature = Math.floor(tmax - t * (tmax - tmin));
                        this.updateTemperature();
                    },
                    // start
                    ev => { },
                    // stop
                    ev => { },
                    // keydown
                    (ev) => {
<<<<<<< HEAD
                        const value = commonKeyHandler(ev, state.thermometerState.temperature, tmin, tmax);
                        if (value !== undefined) {
                            state.thermometerState.temperature = value;
                            this.updateTemperature();
                        }
                    })

                accessibility.makeFocusable(this.thermometer);
                accessibility.setAria(this.thermometer, "slider", pxsim.localization.lf("Temperature"));
                this.thermometer.setAttribute("aria-valuemin", "-5");
                this.thermometer.setAttribute("aria-valuemax", "50");
                this.thermometer.setAttribute("aria-orientation", "vertical");
                this.thermometer.setAttribute("aria-valuenow", "21");
                this.thermometer.setAttribute("aria-valuetext", "21°C");
=======
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            ev.preventDefault();
                            state.thermometerState.temperature--;
                            if(state.thermometerState.temperature < tmin) {
                                state.thermometerState.temperature = tmax;
                            }
                            this.updateTemperature();
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            state.thermometerState.temperature++
                            if(state.thermometerState.temperature > tmax) {
                                state.thermometerState.temperature = tmin;
                            }
                            this.updateTemperature();
                        }
                    })
>>>>>>> hugo_wipboehm
            }

            accessibility.makeFocusable(this.thermometer);
            accessibility.setAria(this.thermometer, "slider", pxsim.localization.lf("Temperature Level"));
            this.thermometer.setAttribute("aria-valuemin", tmin + "");
            this.thermometer.setAttribute("aria-valuemax", tmax + "");
            this.thermometer.setAttribute("aria-orientation", "vertical");
            this.thermometer.setAttribute("aria-valuenow", state.thermometerState.temperature + "");
            this.thermometer.setAttribute("aria-valuetext", state.thermometerState.temperature + "");

            let t = Math.max(tmin, Math.min(tmax, state.thermometerState.temperature))
            let per = Math.floor((state.thermometerState.temperature - tmin) / (tmax - tmin) * 100)
            svg.setGradientValue(this.thermometerGradient, 100 - per + "%");
            this.thermometerText.textContent = t + "°C";
            this.thermometer.setAttribute("aria-valuenow", t.toString());
            this.thermometer.setAttribute("aria-valuetext", t + "°C");
        }

        private updateSoundLevel() {
            let state = this.board;
            if (!state || !state.microphoneState.sensorUsed) return;

            const tmin = 0 // state.microphoneState.min;
            const tmax = 255 //state.microphoneState.max;
            if (!this.soundLevelInitialized) {
                this.soundLevelInitialized = true;
                const level = state.microphoneState.getLevel();
<<<<<<< HEAD
                this.soundLevelText = svg.child(this.g, "text", { class: 'sim-text', x: 370, y: 90, "aria-hidden": true }) as SVGTextElement;
=======
                let gid = "gradient-soundlevel";
                this.soundLevelGradient = svg.linearGradient(this.defs, gid);
                const ty = MB_HEIGHT - 270;
                this.soundLevel = <SVGRectElement>svg.child(this.g, "rect", {
                    class: "sim-thermometer",
                    x: 490,
                    y: ty,
                    width: 30,
                    height: 160,
                    rx: 5,
                    ry: 5,
                    fill: `url(#${gid})`
                });
                // ensure the element is visible
                if (this.soundLevel && (this.soundLevel as any).style)
                    (this.soundLevel as any).style.visibility = "visible";
                this.soundLevelText = svg.child(this.g, "text", {
                    class: 'sim-text big inverted centered',
                    x: 505,
                    y: ty + 190
                }) as SVGTextElement;
                this.soundLevelIcon = svg.child(this.g, "svg", {
                    x: 495,
                    y: 425,
                    viewbox: "0 0 20 29",
                    role: "img",
                }) as SVGTextElement;
                this.soundLevelIcon.setAttribute("aria-hidden", "true");
                this.soundLevelIcon.setAttribute("focusable", "false");
                this.soundLevelIcon.setAttribute("style", "pointer-events: none; opacity: 0.8; width: 20px;");
                svg.child(this.soundLevelIcon, "path", {
                    fill: "white",
                    d: "M 10 19.9375 C 13.011719 19.9375 15.453125 17.503906 15.453125 14.5 L 15.453125 5.4375 C 15.453125 2.433594 13.011719 0 10 0 C 6.988281 0 4.546875 2.433594 4.546875 5.4375 L 4.546875 14.5 C 4.546875 17.503906 6.988281 19.9375 10 19.9375 Z M 19.089844 10.875 L 18.183594 10.875 C 17.679688 10.875 17.273438 11.28125 17.273438 11.78125 L 17.273438 14.5 C 17.273438 18.738281 13.609375 22.136719 9.273438 21.714844 C 5.496094 21.347656 2.726562 17.960938 2.726562 14.175781 L 2.726562 11.78125 C 2.726562 11.28125 2.320312 10.875 1.816406 10.875 L 0.910156 10.875 C 0.40625 10.875 0 11.28125 0 11.78125 L 0 14.054688 C 0 19.132812 3.632812 23.660156 8.636719 24.347656 L 8.636719 26.28125 L 5.453125 26.28125 C 4.953125 26.28125 4.546875 26.6875 4.546875 27.1875 L 4.546875 28.09375 C 4.546875 28.59375 4.953125 29 5.453125 29 L 14.546875 29 C 15.046875 29 15.453125 28.59375 15.453125 28.09375 L 15.453125 27.1875 C 15.453125 26.6875 15.046875 26.28125 14.546875 26.28125 L 11.363281 26.28125 L 11.363281 24.367188 C 16.234375 23.703125 20 19.535156 20 14.5 L 20 11.78125 C 20 11.28125 19.59375 10.875 19.089844 10.875 Z M 19.089844 10.875 "
                });
>>>>>>> hugo_wipboehm
                if (this.props.runtime)
                    this.props.runtime.environmentGlobals[pxsim.localization.lf("sound level")] = state.microphoneState.getLevel();
                this.updateTheme();

                let pt = this.element.createSVGPoint();
                svg.buttonEvents(this.soundLevel,
                    // move
                    (ev) => {
                        let cur = svg.cursorPoint(pt, this.element, ev);
                        let t = Math.max(0, Math.min(1, (cur.y - ty) / 160)) * tmax
                        // console.log(tmax - t);
                        state.microphoneState.setLevel( Math.floor(tmax - t));
                        // state.microphoneState.setLevel(Math.floor(tmin + t * (tmax - tmin)));
                        this.updateMicrophone();
                    },
                    // start
                    ev => { },
                    // stop
                    ev => { },
                    // keydown
                    (ev) => {
<<<<<<< HEAD
                        const value = commonKeyHandler(ev, state.microphoneState.getLevel(), tmin, tmax);
                        if (value !== undefined) {
                            state.microphoneState.setLevel(value);
=======
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            ev.preventDefault();
                            state.microphoneState.setLevel(state.microphoneState.getLevel() - 1);
                            if(state.microphoneState.getLevel() < tmin) {
                                state.microphoneState.setLevel(tmax);
                            }
                            this.updateMicrophone();
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            ev.preventDefault();
                            state.microphoneState.setLevel(state.microphoneState.getLevel() + 1);
                            if(state.microphoneState.getLevel() > tmax) {
                                state.microphoneState.setLevel(tmin);
                            }
>>>>>>> hugo_wipboehm
                            this.updateMicrophone();
                        }
                    })

                accessibility.makeFocusable(this.soundLevel);
                accessibility.setAria(this.soundLevel, "slider", pxsim.localization.lf("Sound Level"));
                this.soundLevel.setAttribute("aria-valuemin", tmin + "");
                this.soundLevel.setAttribute("aria-valuemax", tmax + "");
                this.soundLevel.setAttribute("aria-orientation", "vertical");
                this.soundLevel.setAttribute("aria-valuenow", level + "");
                this.soundLevel.setAttribute("aria-valuetext", level + "");
            }

            let t = Math.max(tmin, Math.min(tmax, state.microphoneState.getLevel()))
            let per = Math.floor((state.microphoneState.getLevel() - tmin) / (tmax - tmin) * 100)
            svg.setGradientValue(this.soundLevelGradient, (100 - per) + "%");
            this.soundLevelText.textContent = t + "";
            this.soundLevel.setAttribute("aria-valuenow", t.toString());
            this.soundLevel.setAttribute("aria-valuetext", t + "");
        }

        private updateHeading() {
            const valMin = 0;
            const valMax = 360;
            let xc = 501.2;
            let yc = 75;
            let state = this.board;
            if (!state || !state.compassState.usesHeading) return;
            // /*
            if (!this.headInitialized) {
                let p = this.heads[1];
                <SVGGElement>svg.child(p, "circle", {style: "fill:#DDDDDD55;stroke:#3A3A3A;", cx: "501.2", cy: "75", r: "55" });
                <SVGGElement>svg.child(p, "polyline", {style: "fill:#008EEF;stroke:#3A3A3A;", points: "517.7,75 501.1,140.2 484.6,75" });
                <SVGGElement>svg.child(p, "polyline", {style: "fill:#FF3951;stroke:#3A3A3A;", points: "484.6,75 501.1,9.5 517.7,75" });
                <SVGGElement>svg.child(p, "circle", {style: "fill:#748476;stroke:#3A3A3A;", cx: "501.1", cy: "75", r: "16.5" });
                <SVGGElement>svg.child(p, "circle", {style: "fill:#CCDBCE;", cx: "501.1", cy: "75", r: "10" });
                // p.setAttribute("d", "m269.9,50.134647l0,0l-39.5,0l0,0c-14.1,0.1 -24.6,10.7 -24.6,24.8c0,13.9 10.4,24.4 24.3,24.7l0,0l39.6,0c14.2,0 40.36034,-22.97069 40.36034,-24.85394c0,-1.88326 -26.06034,-24.54606 -40.16034,-24.64606m-0.2,39l0,0l-39.3,0c-7.7,-0.1 -14,-6.4 -14,-14.2c0,-7.8 6.4,-14.2 14.2,-14.2l39.1,0c7.8,0 14.2,6.4 14.2,14.2c0,7.9 -6.4,14.2 -14.2,14.2l0,0l0,0z");
                this.updateTheme();
                let pt = this.element.createSVGPoint();
                svg.buttonEvents(
                    this.head,
                    // move
                    (ev: MouseEvent) => {
                        let cur = svg.cursorPoint(pt, this.element, ev);
                        state.compassState.heading = valMax - (Math.floor(Math.atan2(cur.y - yc, cur.x - xc) * 180 / Math.PI) + 90) - valMax;
                        if (state.compassState.heading < valMin) state.compassState.heading += valMax;
                        this.updateHeading();
                    },
                    // start
                    ev => { },
                    // stop
                    ev => { },
                    // keydown
                    (ev) => {
<<<<<<< HEAD
                        const value = commonKeyHandler(ev, state.compassState.heading, 0, 359);
                        if (value !== undefined) {
                            state.compassState.heading = value;
=======
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            ev.preventDefault();
                            state.compassState.heading--;
                            if (state.compassState.heading < valMin) state.compassState.heading += valMax;
                            if (state.compassState.heading >= valMax) state.compassState.heading %= valMax;
                            this.updateHeading();
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            ev.preventDefault();
                            state.compassState.heading++;
                            if (state.compassState.heading < valMin) state.compassState.heading += valMax;
                            if (state.compassState.heading >= valMax) state.compassState.heading %= valMax;
>>>>>>> hugo_wipboehm
                            this.updateHeading();
                        }
                    }
                );
                this.headInitialized = true;
            }

            accessibility.makeFocusable(this.head);
            accessibility.setAria(this.head, "slider", pxsim.localization.lf("Heading"));
            this.head.setAttribute("aria-valuemin", valMin + "");
            this.head.setAttribute("aria-valuemax", valMax + "");
            this.head.setAttribute("aria-orientation", "vertical");
            this.head.setAttribute("aria-valuenow", state.compassState.heading + "");
            this.head.setAttribute("aria-valuetext", state.compassState.heading + "");

            let txt = state.compassState.heading.toString() + "°";
            if (txt != this.headText.textContent) {
                svg.rotateElement(this.head, xc, yc, valMax - state.compassState.heading - 90);
                this.headText.textContent = txt;
            }

            // make sim head focusable when there is a compass
            this.headParts.setAttribute("class", "sim-button-outer sim-button-group")
            accessibility.makeFocusable(this.headParts);
        }

        private lastFlashTime: number = 0;
        public flashSystemLed() {
            if (!this.systemLed)
                this.systemLed = <SVGCircleElement>svg.child(this.g, "circle", { class: "sim-systemled", cx: 160.8, cy: 150.9, r: 4 })
            let now = Date.now();
            if (now - this.lastFlashTime > 150) {
                this.lastFlashTime = now;
                svg.animate(this.systemLed, "sim-flash")
            }
        }

        private lastAntennaFlash: number = 0;
        public flashAntenna() {
<<<<<<< HEAD
            if (!this.antennaInitialized) {
                this.antenna.style.visibility = "visible";
                this.antennaInitialized = true;
                const antennaWidth = ANTENNA_WAVE_PERIOD_X * ANTENNA_WAVE_COUNT;
                const valueMin = -128;
                const valueMax = -42;
                const setValue = (val: number) => {
                    const rs = Math.max(valueMin, Math.min(valueMax, val));
                    this.board.radioState.datagram.rssi = rs;
                    this.updateRSSI();
                }
                const pt = this.element.createSVGPoint();
                const mouseEventHandler = (ev: MouseEvent) => {
                    const state = this.board;
                    if (!state) return;
                    const pos = svg.cursorPoint(pt, this.element, ev);
                    setValue((-138 + (pos.x - ANTENNA_X) / antennaWidth * 100) | 0);
                };
                const keyboardEventHandler = (ev: KeyboardEvent) => {
                    const value = commonKeyHandler(ev, this.board.radioState.datagram.rssi ?? -75, valueMin, valueMax);
                    if (value !== undefined) {
                        setValue(value);
                    }
                };

                svg.buttonEvents(this.antenna.children[0], mouseEventHandler, mouseEventHandler, mouseEventHandler, () => { });
                svg.buttonEvents(this.antenna.children[1], mouseEventHandler, mouseEventHandler, mouseEventHandler, () => { });
                this.antenna.addEventListener('keydown', keyboardEventHandler);

                accessibility.makeFocusable(this.antenna);
                accessibility.setAria(this.antenna, "slider", pxsim.localization.lf("Received Signal Strength Indicator"));;
                this.antenna.setAttribute("aria-valuemin", `${valueMin}`);
                this.antenna.setAttribute("aria-valuemax", `${valueMax}`);
                this.antenna.setAttribute("aria-orientation", "horizontal");
                this.antenna.setAttribute("aria-valuenow", (this.board.radioState.datagram.rssi ?? -75).toString());
=======
            if (!this.g) return; // g element not ready yet
            if (!this.antenna) {
                let ax = 480;
                let dax = 18;
                let ayt = 10;
                let ayb = 40;
                this.antenna = <SVGPolylineElement>svg.child(this.g, "polyline", { class: "sim-antenna", points: `${ax},${ayb} ${ax},${ayt} ${ax += dax},${ayt} ${ax},${ayb} ${ax += dax},${ayb} ${ax},${ayt} ${ax += dax},${ayt} ${ax},${ayb} ${ax += dax},${ayb} ${ax},${ayt} ${ax += dax},${ayt}` })
>>>>>>> hugo_wipboehm
            }
            let now = Date.now();
            if (now - this.lastAntennaFlash > 200) {
                this.lastAntennaFlash = now;
<<<<<<< HEAD
                svg.animate(this.antenna.children[1] as SVGElement, 'sim-flash-stroke')
            }
            this.updateRSSI();
        }

        private updateRSSI() {
            let state = this.board;
            if (!state) return;
            const v = state.radioState.datagram.rssi;
            if (v === undefined) return;

            if (!this.rssi) {
                let ayt = 10;
                let ayb = 40;
                for (let i = 0; i < 4; ++i)
                    svg.child(this.g, "rect", { x: ANTENNA_X - 90 + i * 6, y: ayt + 28 - i * 4, width: 4, height: 2 + i * 4, fill: "#fff" })
                this.rssi = svg.child(this.g, "text", { x: ANTENNA_X - 64, y: ayb, class: "sim-text", "aria-hidden": true }) as SVGTextElement;
                this.rssi.textContent = "";
            }

            const vt = v.toString();
            if (vt !== this.rssi.textContent) {
                this.rssi.textContent = v.toString();
                this.antenna.setAttribute("aria-valuenow", this.rssi.textContent);
=======
                // Safety check: ensure antenna has children and the child element exists
                if (this.antenna && this.antenna.children && this.antenna.children.length > 1 && this.antenna.children[1]) {
                    const antennaElement = this.antenna.children[1] as SVGElement;
                    // Additional check to ensure element has classList
                    if (antennaElement && antennaElement.classList) {
                        svg.animate(antennaElement, 'sim-flash-stroke')
                    }
                }
>>>>>>> hugo_wipboehm
            }
        }

        private updatePins() {
            let state = this.board;
            if (!state) return;

            state.edgeConnectorState.pins.forEach((pin, i) => this.updatePin(pin, i));
        }

        private updateLightLevel() {
            let state = this.board;
            const valMin = 0;
            const valMax = 255;
            if (!state || !state.lightSensorState.usesLightLevel) return;

            if (!this.lightLevelButton) {
                let gid = "gradient-light-level";
                this.lightLevelGradient = svg.linearGradient(this.defs, gid)
				const cx = 25;
                const cy = 75;
                const r = 55;

                this.lightLevelButton = svg.child(this.g, "circle", {
                    cx: `${cx}px`, cy: `${cy}px`, r: `${r}px`,
                    class: 'sim-light-level-button',
                    fill: `url(#${gid})`
                }) as SVGCircleElement;
                let pt = this.element.createSVGPoint();

                svg.buttonEvents(this.lightLevelButton,
                    // move
                    (ev) => {
                        let pos = svg.cursorPoint(pt, this.element, ev);
                        let rs = r / 2;
                        let level = valMax - Math.max(valMin, Math.min(valMax, Math.floor((pos.y - (cy - r)) / (2 * r) * valMax)));

                        if (level != state.lightSensorState.lightLevel) {
                            state.lightSensorState.lightLevel = level;
                            this.applyLightLevel();
                        }
                    },
                    // start
                    ev => { },
                    // stop
                    ev => { },
                    // keydown
<<<<<<< HEAD
                    (ev) => {
                        const value = commonKeyHandler(ev, state.lightSensorState.lightLevel, 0, 255);
                        if (value !== undefined) {
                            state.lightSensorState.lightLevel = value;
                            this.updateLightLevel();
                        }
                    });
                this.lightLevelText = svg.child(this.g, "text", { x: 85, y: LIGHT_LEVEL_BUTTON_POSITION_Y + LIGHT_LEVEL_BUTTON_RADIUS - 5, text: '', class: 'sim-text', 'aria-hidden': true }) as SVGTextElement;
                if (this.props.runtime)
                    this.props.runtime.environmentGlobals[pxsim.localization.lf("lightLevel")] = state.lightSensorState.lightLevel;
                this.updateTheme();

                accessibility.makeFocusable(this.lightLevelButton);
                accessibility.setAria(this.lightLevelButton, "slider", pxsim.localization.lf("Light level"));
                this.lightLevelButton.setAttribute("aria-valuemin", "0");
                this.lightLevelButton.setAttribute("aria-valuemax", "255");
                this.lightLevelButton.setAttribute("aria-orientation", "vertical");
                this.lightLevelButton.setAttribute("aria-valuenow", "128");
=======
                    ev => {
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode
                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            ev.preventDefault();
                            this.board.lightSensorState.lightLevel--;
                            if (this.board.lightSensorState.lightLevel < valMin) {
                                this.board.lightSensorState.lightLevel = valMax;
                            }
                            this.applyLightLevel();
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            ev.preventDefault();
                            this.board.lightSensorState.lightLevel++;
                            if (this.board.lightSensorState.lightLevel > valMax) {
                                this.board.lightSensorState.lightLevel = valMin;
                            }
                            this.applyLightLevel();
                        }
                    })
                this.lightLevelText = svg.child(this.g, "text", { x: cx , y: cy + r + 35, text: '', class: 'sim-text inverted big centered' }) as SVGTextElement;
                this.updateTheme();
>>>>>>> hugo_wipboehm
            }

            accessibility.makeFocusable(this.lightLevelButton);
            accessibility.setAria(this.lightLevelButton, "slider", pxsim.localization.lf("Light Level"));
            this.lightLevelButton.setAttribute("aria-valuemin", valMin + "");
            this.lightLevelButton.setAttribute("aria-valuemax", valMax + "");
            this.lightLevelButton.setAttribute("aria-orientation", "vertical");
            this.lightLevelButton.setAttribute("aria-valuenow", state.lightSensorState.lightLevel + "");
            this.lightLevelButton.setAttribute("aria-valuetext", state.lightSensorState.lightLevel + "");

            svg.setGradientValue(this.lightLevelGradient, Math.min(100, Math.max(0, Math.floor((255 - state.lightSensorState.lightLevel) * 100 / 255))) + '%')
            this.lightLevelText.textContent = state.lightSensorState.lightLevel.toString();
        }

        private applyLightLevel() {
            let lv = this.board.lightSensorState.lightLevel;
            svg.setGradientValue(this.lightLevelGradient, Math.min(100, Math.max(0, Math.floor((255 - lv) * 100 / 255))) + '%')
            this.lightLevelText.textContent = lv.toString();
<<<<<<< HEAD
            this.lightLevelButton.setAttribute("aria-valuenow", lv.toString());
        }

        findParentElement() {
            let el = this.element;
            while (el.parentNode && el.parentNode.nodeName == "svg")
                el = el.parentNode as SVGSVGElement;
            return el;
=======
>>>>>>> hugo_wipboehm
        }

        private updateTilt() {
            if (this.props.disableTilt) return;
            let state = this.board;
            if (!state || !state.accelerometerState.accelerometer.isActive) return;

            const x = state.accelerometerState.accelerometer.getX();
            const y = -state.accelerometerState.accelerometer.getY();
            const af = 8 / 1023;
            const s = 1 - Math.min(0.1, Math.pow(Math.max(Math.abs(x), Math.abs(y)) / 1023, 2) / 35);

            // When breadboarding, the board element is a child of the composition host <svg>
            // that also holds the wire layers (under/overboard) — tilt that host so the cables
            // move with the board. Without a breadboard the board element is top-level, so tilt it.
            const parent: any = this.element.parentNode;
            const host: any = (parent && parent.tagName && parent.tagName.toLowerCase() === "svg") ? parent : null;
            const target: any = host || this.element;
            if (host) this.element.style.transform = "";

<<<<<<< HEAD
            // fix top parent and apply style to it
            const el = this.findParentElement();
            el.style.transform = `perspective(30em) rotateX(${y * af}deg) rotateY(${x * af}deg) scale(${s}, ${s})`
            el.style.perspectiveOrigin = "50% 50% 50%";
            el.style.perspective = "30em";

            // don't display acc data when AB is on, v2 is on or soundLevel is on
            const soundLevelVisible = this.soundLevel.style.visibility == "visible";
            if (state.buttonPairState.usesButtonAB
                || this.v2Circle
                || soundLevelVisible) {
                if (this.accTextX) this.accTextX.textContent = "";
                if (this.accTextY) this.accTextY.textContent = "";
                if (this.accTextZ) this.accTextZ.textContent = "";
            } else {
                // update text
                if (acc.flags & AccelerometerFlag.X) {
                    if (!this.accTextX) {
                        this.accTextX = svg.child(this.g, "text", { x: 365, y: 260, class: "sim-text", "aria-hidden": true }) as SVGTextElement;
                        this.accTextX.textContent = "";
                    }
                    this.accTextX.textContent = `ax:${x}`;
                }
                if (acc.flags & AccelerometerFlag.Y) {
                    if (!this.accTextY) {
                        this.accTextY = svg.child(this.g, "text", { x: 365, y: 285, class: "sim-text", "aria-hidden": true }) as SVGTextElement;
                        this.accTextY.textContent = "";
                    }
                    this.accTextY.textContent = `ay:${-y}`;
                }
                if (acc.flags & AccelerometerFlag.Z) {
                    if (!this.accTextZ) {
                        this.accTextZ = svg.child(this.g, "text", { x: 365, y: 310, class: "sim-text", "aria-hidden": true }) as SVGTextElement;
                        this.accTextZ.textContent = "";
                    }
                    this.accTextZ.textContent = `az:${z}`;
                }
            }
=======
            target.style.transform = `perspective(30em) rotateX(${y * af}deg) rotateY(${x * af}deg) scale(${s}, ${s})`
            target.style.perspectiveOrigin = "50% 50% 50%";
            target.style.perspective = "30em";
>>>>>>> hugo_wipboehm
        }

        private buildDom() {
            // restore persisted disableTilt setting from localStorage if present
            // try {
            //     const val = localStorage.getItem('pxt:disableTilt');
            //     if (val !== null) {
            //         if (!this.props) this.props = {} as any;
            //         this.props.disableTilt = val === '1';
            //     }
            // } catch (e) { }
            // Calliope mini board: parse the static artwork once (board-svg.ts), then wire
            // the dynamic layer (LEDs, RGB, buttons, pins, motors) programmatically below.
            // v2 and v3 share the same element IDs, so the wiring below is version-agnostic;
            // only the artwork body and the pin titles differ between revisions.
            const b: any = this.props && this.props.runtime && this.props.runtime.board;
            this.domHardwareVersion = (b && b.hardwareVersion == 2) ? 2 : 3;
            const boardBody = this.domHardwareVersion == 2 ? BOARD_MINI2_BODY : BOARD_MINI3_BODY;
            const boardPinTitles = this.domHardwareVersion == 2 ? pinTitlesV2 : pinTitles;
            const SVG_CODE = BOARD_SVG_HEAD + boardBody + BOARD_SVG_BOTTOM;
            const boardDoc = new DOMParser().parseFromString(SVG_CODE, "image/svg+xml");
            this.element = boardDoc.querySelector("svg") as SVGSVGElement;
            if (!this.element || boardDoc.querySelector("parsererror")) {
                // A malformed body string must not leave this.element null/garbage —
                // fail loudly with a usable (if empty) svg root instead.
                console.error("sim: board SVG failed to parse", boardDoc.querySelector("parsererror")?.textContent);
                this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg") as SVGSVGElement;
            }
            svg.hydrate(this.element, {
                "version": "1.0",
                "viewBox": `0 0 ${MB_WIDTH} ${MB_HEIGHT}`,
                "class": "sim",
                "x": "0px",
                "y": "0px",
                "width": MB_WIDTH + "px",
                "height": MB_HEIGHT + "px",
                "fill": "rgba(0,0,0,0)",
<<<<<<< HEAD
                // Allows screen reader users to interact with board properly.
                "role": "application"
=======
                "overflow": "visible"
>>>>>>> hugo_wipboehm
            });
            this.style = <SVGStyleElement>svg.child(this.element, "style", {});
            this.style.textContent = MB_STYLE;

            this.defs = <SVGDefsElement>svg.child(this.element, "defs", {});
            this.g = <SVGGElement>svg.elt("g");
            this.element.appendChild(this.g);

            // filters
            let ledglow = svg.child(this.defs, "filter", { id: "ledglow", x: "-75%", y: "-75%", width: "300%", height: "300%" });
            svg.child(ledglow, "feMorphology", { operator: "dilate", radius: "1", in: "SourceAlpha", result: "thicken" });
            svg.child(ledglow, "feGaussianBlur", { stdDeviation: "5", in: "thicken", result: "blurred" });
            svg.child(ledglow, "feFlood", { "flood-color": "rgb(255, 17, 77)", result: "glowColor" });
            svg.child(ledglow, "feComposite", { in: "glowColor", in2: "blurred", operator: "in", result: "ledglow_colored" });
            let ledglowMerge = svg.child(ledglow, "feMerge", {});
            svg.child(ledglowMerge, "feMergeNode", { in: "ledglow_colored" });
            svg.child(ledglowMerge, "feMergeNode", { in: "SourceGraphic" });

            let glow = svg.child(this.defs, "filter", { id: "filterglow", x: "-5%", y: "-5%", width: "120%", height: "120%" });
            svg.child(glow, "feGaussianBlur", { stdDeviation: "5", result: "glow" });
            let merge = svg.child(glow, "feMerge", {});
            for (let i = 0; i < 3; ++i) svg.child(merge, "feMergeNode", { in: "glow" })

            // leds
            this.leds = [];
            this.ledsOuter = [];
            // Reference LEDs from the board artwork define the matrix grid; if an id is
            // missing (renamed artwork), warn and fall back to the known coordinates
            // instead of throwing and leaving the whole simulator blank.
            const led00 = this.element.getElementById("LED_0_0");
            const led10 = this.element.getElementById("LED_1_0");
            const led01 = this.element.getElementById("LED_0_1");
            if (!led00 || !led10 || !led01)
                console.warn("sim: LED reference elements (LED_0_0/LED_1_0/LED_0_1) missing from board SVG");
            const left = Number(led00?.getAttribute("x") ?? 210.7);
            const top = Number(led00?.getAttribute("y") ?? 146.2);
            const ledoffw = Number(led10?.getAttribute("x") ?? 236.8) - left;
            const ledoffh = Number(led01?.getAttribute("y") ?? 171.7) - top;
            // const ledw = 5.1;
            // const ledh = 12.9;
            for (let i = 0; i < 5; ++i) {
                let ledtop = i * ledoffh + top;
                for (let j = 0; j < 5; ++j) {
                    let ledleft = j * ledoffw + left;
                    let k = i * 5 + j;
                    this.ledsOuter.push(svg.child(this.g, "rect", { class: "sim-led-back", x: ledleft, y: ledtop, width: 10, height: 20, rx: 2, ry: 2 }));
                    let led = svg.child(this.g, "rect", { class: "sim-led", x: ledleft - 2, y: ledtop - 2, width: 14, height: 24, rx: 3, ry: 3, title: `(${j},${i})` });
                    svg.filter(led, `url(#ledglow)`)
                    this.leds.push(led);
                }
            }


             // head
            //  this.headg = <SVGGElement>svg.child(this.g, "g", { style: "transform: translate(100px, 0px);" });
             this.head = <SVGGElement>svg.child(this.g, "g", { class: "sim-head" });
             svg.child(this.head, "circle", { cx: 501.2, cy: 75, r: 100, fill: "transparent" })
             this.headParts = <SVGGElement>svg.child(this.head, "g", { class: "sim-button-outer sim-button-group" });
             this.heads = []
            //  background
            this.heads.push(svg.path(this.headParts, "sim-button",""));
            //  shapes
            this.heads.push(<SVGGElement>svg.child(this.headParts, "g", { class: "sim-theme" }));
            //  this.heads.push(svg.path(this.headParts, "sim-theme", "M230.6,69.7c-2.9,0-5.3,2.4-5.3,5.3c0,2.9,2.4,5.3,5.3,5.3c2.9,0,5.3-2.4,5.3-5.3C235.9,72.1,233.5,69.7,230.6,69.7"));
            //  this.heads.push(svg.path(this.headParts, "sim-theme", "M269.7,80.3c2.9,0,5.3-2.4,5.3-5.3c0-2.9-2.4-5.3-5.3-5.3c-2.9,0-5.3,2.4-5.3,5.3C264.4,77.9,266.8,80.3,269.7,80.3"));
             this.headText = <SVGTextElement>svg.child(this.g, "text", { x: 500, y: 165, class: "sim-text inverted big centered" })

<<<<<<< HEAD
            const ayt = 10;
            const ayb = 40;
            const antennaWidth = ANTENNA_WAVE_PERIOD_X * ANTENNA_WAVE_COUNT;
            const borderOffset = 3;

            svg.child(this.antenna, "rect", {
                x: ANTENNA_X - borderOffset,
                y: ayt - borderOffset,
                width: antennaWidth + 2 * borderOffset,
                height: ayb - ayt + 2 * borderOffset,
                fill: "transparent",
                rx: 2
            });

            let ax = ANTENNA_X;
            const dax = ANTENNA_WAVE_PERIOD_X;
            svg.child(this.antenna, "polyline", { class: "sim-antenna", points: `${ax},${ayb} ${ax},${ayt} ${ax += dax},${ayt} ${ax},${ayb} ${ax += dax},${ayb} ${ax},${ayt} ${ax += dax},${ayt} ${ax},${ayb} ${ax += dax},${ayb} ${ax},${ayt} ${ax += dax},${ayt}` });
            this.antenna.style.visibility = "hidden";
        }

        private buildSoundLevel() {
            let gid = "gradient-soundlevel";
            this.soundLevelGradient = svg.linearGradient(this.defs, gid);
            this.soundLevel = <SVGRectElement>svg.child(this.g, "rect", {
                class: "sim-thermometer no-drag",
                x: 360,
                y: 110,
                width: 20,
                height: 160,
                rx: 5, ry: 5,
                fill: `url(#${gid})`
            });
            this.soundLevel.style.visibility = "hidden";
        }

        private buildThermometerElement() {
            let gid = "gradient-thermometer";
            this.thermometerGradient = svg.linearGradient(this.defs, gid);
            this.thermometer = <SVGRectElement>svg.child(this.g, "rect", {
                class: "sim-thermometer no-drag",
                x: 120,
                y: 110,
                width: 20,
                height: 160,
                rx: 5, ry: 5,
                fill: `url(#${gid})`
            });
            this.thermometer.style.visibility = "hidden";
        }

        private buildLightLevelElement() {
            let gid = "gradient-light-level";
            this.lightLevelGradient = svg.linearGradient(this.defs, gid);
            this.lightLevelButton = svg.child(this.g, "circle", {
                cx: `50px`, cy: `${LIGHT_LEVEL_BUTTON_POSITION_Y}px`, r: `${LIGHT_LEVEL_BUTTON_RADIUS}px`,
                class: 'sim-light-level-button no-drag',
                fill: `url(#${gid})`
            }) as SVGCircleElement;
            this.lightLevelButton.style.visibility = "hidden";
        }

        private buildHeadElement() {
            // head
            this.head = <SVGGElement>svg.child(this.g, "g", { class: "sim-head" });
            svg.child(this.head, "ellipse", { cx: 251, cy: 75, rx: 75, ry: 35, fill: "transparent" })
            this.headParts = <SVGGElement>svg.child(this.head, "g", {});
            this.heads = []
            // background
            this.heads.push(svg.path(this.headParts, "sim-button", "M 269.9 50.2 L 269.9 50.2 l -39.5 0 v 0 c -14.1 0.1 -24.6 10.7 -24.6 24.8 c 0 13.9 10.4 24.4 24.3 24.7 v 0 h 39.6 c 14.2 0 24.8 -10.6 24.8 -24.7 C 294.5 61 284 50.3 269.9 50.2 M 269.7 89.2"));
            // shapes
            this.heads.push(svg.path(this.headParts, "sim-theme", "M269.9,50.2L269.9,50.2l-39.5,0v0c-14.1,0.1-24.6,10.7-24.6,24.8c0,13.9,10.4,24.4,24.3,24.7v0h39.6c14.2,0,24.8-10.6,24.8-24.7C294.5,61,284,50.3,269.9,50.2 M269.7,89.2L269.7,89.2l-39.3,0c-7.7-0.1-14-6.4-14-14.2c0-7.8,6.4-14.2,14.2-14.2h39.1c7.8,0,14.2,6.4,14.2,14.2C283.9,82.9,277.5,89.2,269.7,89.2"));
            this.heads.push(svg.path(this.headParts, "sim-theme", "M230.6,69.7c-2.9,0-5.3,2.4-5.3,5.3c0,2.9,2.4,5.3,5.3,5.3c2.9,0,5.3-2.4,5.3-5.3C235.9,72.1,233.5,69.7,230.6,69.7"));
            this.heads.push(svg.path(this.headParts, "sim-theme", "M269.7,80.3c2.9,0,5.3-2.4,5.3-5.3c0-2.9-2.4-5.3-5.3-5.3c-2.9,0-5.3,2.4-5.3,5.3C264.4,77.9,266.8,80.3,269.7,80.3"));
            this.headText = <SVGTextElement>svg.child(this.g, "text", { x: 160, y: 60, class: "sim-text", "aria-hidden": true })
        }

        private buildPinElements() {
=======
>>>>>>> hugo_wipboehm
            // https://www.microbit.co.uk/device/pins
            // P0, P1, P2, P3
            this.pins = pinNames.map(n => {
				let p = this.element.getElementById(n) as SVGElement;
				if (!p) {
					// Missing pin id in the artwork (e.g. present in only one board
					// body): warn and substitute an invisible placeholder so the
					// board still builds and downstream per-pin code stays safe.
					console.warn(`sim: pin element ${n} missing from board SVG`);
					p = svg.child(this.g, "rect", { x: 0, y: 0, width: 0, height: 0 }) as SVGElement;
				}
				U.addClass(p, "sim-pin");
				return p;
			});

            this.pins.forEach((p, i) => svg.hydrate(p, { title: boardPinTitles[i] }));

<<<<<<< HEAD
            // P3
            drawList.push(() => svg.path(this.g, "sim-pin", "M0,357.7v19.2c0,10.8,6.2,20.2,14.4,25.2v-44.4H0z"));

            pins4onXs.forEach(x => {
                drawList.push(() => svg.child(this.g, "rect", { x: x, y: 356.7, width: 10, height: 50, class: "sim-pin" }));
            });

            drawList.push(() => svg.path(this.g, "sim-pin", "M483.6,402c8.2-5,14.4-14.4,14.4-25.1v-19.2h-14.4V402z"));
            drawList.push(() => svg.path(this.g, "sim-pin", "M359.9,317.3c-12.8,0-22.1,10.3-23.1,23.1V406H383v-65.6C383,327.7,372.7,317.3,359.9,317.3z M360,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C379.3,351.5,370.7,360.1,360,360.1z"));
            drawList.push(() => svg.path(this.g, "sim-pin", "M458,317.6c-13,0-23.6,10.6-23.6,23.6c0,0,0,0.1,0,0.1h0V406H469c4.3,0,8.4-1,12.6-2.7v-60.7c0-0.4,0-0.9,0-1.3C481.6,328.1,471,317.6,458,317.6z M457.8,360.9c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C477.1,352.2,468.4,360.9,457.8,360.9z"));

            this.pins = pinDrawOrder.reduce((pins, pinName) => {
                const simPinIndex = pinNames.indexOf(pinName);
                const newPin = drawList[simPinIndex]();
                svg.hydrate(newPin, { title: pinTitles[simPinIndex].ariaLabel });
                pins[simPinIndex] = newPin;
                return pins;
            }, new Array(pinDrawOrder.length));
=======
            // this.pins = pinDrawOrder.reduce((pins, pinName) => {
            //     const simPinIndex = pinNames.indexOf(pinName);
            //     const newPin = drawList[simPinIndex]();
            //     svg.hydrate(newPin, { title: pinTitles[simPinIndex] });
            //     pins[simPinIndex] = newPin;
            //     return pins;
            // }, new Array(pinDrawOrder.length));
>>>>>>> hugo_wipboehm

            this.pinGradients = this.pins.map((pin, i) => {
                let gid = "gradient-pin-" + i
                let lg = svg.linearGradient(this.defs, gid)
                pin.setAttribute("fill", `url(#${gid})`);
                return lg;
            });

<<<<<<< HEAD
            this.pinTexts = [67, 165, 275].map(x => <SVGTextElement>svg.child(this.g, "text", { class: "sim-text-pin", x: x, y: 345, "aria-hidden": true }));
=======
            // this.pinTexts = [
            //         [-20,   340],
            //         [50,    495],
            //         [450,   495],
            //         [500,   340]
            //     ].map(p => <SVGTextElement>svg.child(this.g, "text", { class: "sim-text-pin", x: p[0], y: p[1] }));
>>>>>>> hugo_wipboehm

            this.pinTexts = {
                [DigitalPin.P0]: <SVGTextElement>svg.child(this.g, "text", { class: "sim-text-pin big centered", x: 20, y: 325 }),
                [DigitalPin.P1]: <SVGTextElement>svg.child(this.g, "text", { class: "sim-text-pin big centered", x: 135, y: 540 }),
                [DigitalPin.P2]: <SVGTextElement>svg.child(this.g, "text", { class: "sim-text-pin big centered", x: 395, y: 540 }),
                [DigitalPin.P3]: <SVGTextElement>svg.child(this.g, "text", { class: "sim-text-pin big centered", x: 540, y: 325 })
            }

            // BTN A, B
            const btnids = ["BTN_A", "BTN_B"];
            this.buttonsOuter = btnids.map(n => this.element.getElementById(n + "_BOX") as SVGElement);
            this.buttonsOuter.forEach(b => U.addClass(b, "sim-button-outer"));
            this.buttons = btnids.map(n => this.element.getElementById(n) as SVGElement);
            this.buttons.forEach(b => U.addClass(b, "sim-button"));

            // BTN A+B
            const outerBtn = (left: number, top: number) => {
                const button = this.mkBtn(left, top, 'A + B');
                this.buttonsOuter.push(button.outer);
                this.buttons.push(button.inner);
                return button;
            }

            let ab = outerBtn(100, MB_HEIGHT - 90);
            // let abtext = svg.child(ab.outer, "text", { x: 210, y: MB_HEIGHT - 5, class: "sim-text big inverted centered" }) as SVGTextElement;
            // abtext.textContent = "A+B";
            (<any>this.buttonsOuter[2]).style.visibility = "hidden";
            (<any>this.buttons[2]).style.visibility = "hidden";

            // Microphone activity LED — on the PCB between button B (~450,226) and
            // the "Mikrofon" group (437-461, 272-292), top-right of the mic; lit
            // while the program records audio or reads the sound level (see
            // updateRecordingActive).
            if (this.domHardwareVersion == 3) {
                this.microphoneLed = svg.child(this.g, "circle", {
                    cx: 465, cy: 262, r: 4, fill: "#3f3f3f"
                });
                svg.hydrate(this.microphoneLed, { title: pxsim.localization.lf("microphone") });
            }

            this.buttonGroup = svg.child(this.element, "g") as SVGGElement;

            // Calliope mini revision toggle (v2 <-> v3), rendered inside the simulator.
            this.buildVersionToggle();
        }

<<<<<<< HEAD
        private updateHardwareVersion() {
            // check if microphone has been used
            const b = this.board;
            if (!b) return;
            if (b.microphoneState.sensorUsed)
                b.ensureHardwareVersion(2);

            // check current version
            const version = this.board.hardwareVersion;
            if (version === this.domHardwareVersion) return;

            this.domHardwareVersion = this.board.hardwareVersion;
            // v2 skinning
            // don't use yellow theme
            if (this.props.theme.accent === "#FFD43A") {
                this.props.theme = themes[0];
            }

            // display v2 indicator
            const title = pxsim.localization.lf("micro:bit v2 needed")
            this.v2Circle = <SVGCircleElement>svg.child(this.g, "circle", { r: 21, title: title });
            svg.fill(this.v2Circle, "white");
            this.v2Text = <SVGTextElement>svg.child(this.g, "text", { class: "sim-text", title: title, "aria-hidden": true });
            this.v2Text.textContent = "V2";
            svg.fill(this.v2Text, "black");
            this.v2Text.style.fontWeight = "700";

            // update pins
            // notch: 46.2 -> h 7 c 0 0 -1 -9 8 -8 l 18 0 c 0 0 9 -1 8 8 h 7
            this.pins[0].setAttribute("d", "M 16.5 341.2 c 0 0.4 -0.1 0.9 -0.1 1.3 v 60.7 c 2.6 1.8 4.6 2.8 8.6 2.8 c 0 0 -1 -9 8 -8 l 16 0 c 0 0 9 -1 8 8 h 8 v -64.7 c 0 0 0 -0.1 0 -0.1 c 0 -13 -10.6 -23.6 -23.7 -23.6 C 27.2 317.6 16.5 328.1 16.5 341.2 z M 21.2 341.6 c 0 -10.7 8.7 -19.3 19.3 -19.3 c 10.7 0 19.3 8.7 19.3 19.3 c 0 10.7 -8.6 19.3 -19.3 19.3 C 29.9 360.9 21.2 352.2 21.2 341.6 z")
            this.pins[1].setAttribute("d", "M139.1,317.3c-12.8,0-22.1,10.3-23.1,23.1V406h 6 c 0 0 -1 -9 8 -8 l 17 0 c 0 0 9 -1 8 8 h 7v-65.6C162.2,327.7,151.9,317.3,139.1,317.3zM139.3,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C158.6,351.5,150,360.1,139.3,360.1z");
            this.pins[2].setAttribute("d", "M249,317.3c-12.8,0-22.1,10.3-23.1,23.1V406h 6 c 0 0 -1 -9 8 -8 l 17 0 c 0 0 9 -1 8 8 h 7v-65.6C272.1,327.7,261.8,317.3,249,317.3z M249.4,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C268.7,351.5,260.1,360.1,249.4,360.1z");

            // 3v
            this.pins[this.pins.length - 2].setAttribute("d", "M359.9,317.3c-12.8,0-22.1,10.3-23.1,23.1V406h 7 c 0 0 -1 -9 8 -8 l 17 0 c 0 0 9 -1 8 8 h 7v-65.6C383,327.7,372.7,317.3,359.9,317.3z M360,360.1c-10.7,0-19.3-8.6-19.3-19.3c0-10.7,8.6-19.3,19.3-19.3c10.7,0,19.3,8.7,19.3,19.3C379.3,351.5,370.7,360.1,360,360.1z")
            this.pins[this.pins.length - 1].setAttribute("d", "M 458 317.6 c -13 0 -23.6 10.6 -23.6 23.6 c 0 0 0 0.1 0 0.1 h 0 V 406 h 7 c 0 0 -1 -9 8 -8 l 17 0 c 0 0 9 -1 8 8 h 1.6 c 2 0 4 -1 5 -3 v -60.7 c 0 -0.4 0 -0.9 0 -1.3 C 481.6 328.1 471 317.6 458 317.6 z M 457.8 360.9 c -10.7 0 -19.3 -8.6 -19.3 -19.3 c 0 -10.7 8.6 -19.3 19.3 -19.3 c 10.7 0 19.3 8.7 19.3 19.3 C 477.1 352.2 468.4 360.9 457.8 360.9 z")

            // outline
            this.pkg.setAttribute("d", "M 498 31.9 C 498 14.3 483.7 0 466.1 0 H 31.9 C 14.3 0 0 14.3 0 31.9 v 342.2 C -1 399 21 405 23 406 c 0 0 -1 -9 8 -8 l 18 0 c 0 0 9 -1 8 8 h 7 h 50 h 7 c 0 0 -1 -9 8 -8 l 18 0 c 0 0 9 -1 8 8 h 7 h 63 h 7 c 0 0 -1 -9 8 -8 l 18 0 c 0 0 9 -1 8 8 h 7 h 64 h 7 c 0 0 -1 -9 8 -8 l 18 0 c 0 0 9 -1 8 8 h 7 h 51 h 5 c 0 0 -1 -9 8 -8 l 18 0 c 0 0 9 -1 8 8 h 0 c 9 0 23 -17 23 -31 V 31.9 z M 14.3 206.7 c -2.7 0 -4.8 -2.2 -4.8 -4.8 c 0 -2.7 2.2 -4.8 4.8 -4.8 c 2.7 0 4.8 2.2 4.8 4.8 C 19.2 204.6 17 206.7 14.3 206.7 z M 486.2 206.7 c -2.7 0 -4.8 -2.2 -4.8 -4.8 c 0 -2.72 0.2 -4.8 4.8 -4.8 c 2.7 0 4.8 2.2 4.8 4.8 C 491 204.6 488.8 206.7 486.2 206.7 z")

            const headTitle = pxsim.localization.lf("logo touch (micro:bit v2 needed)")
            accessibility.makeFocusable(this.headParts);
            accessibility.setAria(this.headParts, "button", headTitle);
            this.headParts.setAttribute("class", "sim-button-outer sim-button-group")
            this.attachButtonEvents(this.board.logoTouch, this.headParts, this.headParts);
            document.body.addEventListener(pointerEvents.down[0], this.moveHeadingOnClick);

            // microphone led
            const microphoneTitle = pxsim.localization.lf("microphone (micro:bit v2 needed)")
            const microg = svg.child(this.g, "g", { title: microphoneTitle })
            this.microphoneLed = svg.path(microg, "sim-led sim-mic", "M 352.852 71 C 351.315 71 350.07 72.248 350.07 73.784 V 79.056 C 350.07 80.594 351.316 81.838 352.852 81.838 C 354.387 81.838 355.634 80.593 355.634 79.056 V 73.784 C 355.634 72.248 354.387 71 352.852 71 Z M 346.743 79.981 C 346.743 82.84 348.853 85.062 351.501 85.658 V 87.095 H 348.448 V 89.329 H 357.366 V 87.095 H 354.306 V 85.658 C 356.954 85.064 359.071 82.842 359.071 79.981 H 357.057 C 357.057 82.174 355.168 83.81 352.905 83.81 C 350.64 83.81 348.757 82.173 348.757 79.981 Z");
            svg.fills([this.microphoneLed], this.props.theme.ledOff);
            // ring
            svg.child(this.g, "circle", { cx: 336, cy: 86, r: 3, stroke: "gold", strokeWidth: "1px" })

            this.updateMicrophone();
            this.updateTheme();
=======
        // Small in-simulator button (top-right of the board) that switches the rendered
        // Calliope mini revision between v2 and v3. It shows the current revision and, on
        // click, persists the choice and rebuilds the board artwork in place.
        private buildVersionToggle() {
            const w = 70, h = 32, pad = 14;
            const x = MB_WIDTH - w - pad, y = pad;
            const g = svg.child(this.element, "g", { class: "sim-version-toggle" }) as SVGGElement;
            (g.style as any).cursor = "pointer";
            const bg = svg.child(g, "rect", {
                x, y, width: w, height: h, rx: 7, ry: 7,
                fill: "#044854", stroke: "#ffffff", "stroke-width": 1.5, opacity: 0.92
            });
            const label = svg.child(g, "text", {
                x: x + w / 2, y: y + h / 2,
                "text-anchor": "middle", "dominant-baseline": "central",
                fill: "#ffffff", "font-size": 16, "font-weight": "bold",
                "font-family": "sans-serif", "pointer-events": "none"
            }) as SVGTextElement;
            label.textContent = "mini " + (this.domHardwareVersion == 2 ? "v2" : "v3");
            svg.hydrate(g, { title: pxsim.localization.lf("Switch Calliope mini revision (v2/v3)") });
            // Keyboard/screen-reader operability: focusable button, Enter/Space toggles.
            accessibility.makeFocusable(g);
            accessibility.setAria(g, "button", pxsim.localization.lf("Switch Calliope mini revision (v2/v3)"));
            accessibility.enableKeyboardInteraction(g, () => this.toggleHardwareVersion());
            // Swallow pointer events so the board's tilt/accelerometer handlers don't react.
            pointerEvents.down.forEach(evid => g.addEventListener(evid, (ev: Event) => ev.stopPropagation()));
            g.addEventListener("click", (ev: Event) => {
                ev.stopPropagation();
                this.toggleHardwareVersion();
            });
            this.versionToggle = g;
>>>>>>> hugo_wipboehm
        }

        // Flip the hardware revision (v2 <-> v3), persist it so the re-init picks it up, and
        // restart the simulator exactly like the "Restart" toolbar button. initAsync() reads the
        // persisted revision when the board is re-created, so the whole board is rebuilt cleanly.
        private toggleHardwareVersion() {
            const next = this.domHardwareVersion == 2 ? 3 : 2;
            try { localStorage.setItem("calliope:simHwVersion", "" + next); } catch (e) { }
            Runtime.postMessage(<pxsim.SimulatorCommandMessage>{ type: "simulator", command: "restart" });
        }

        private mkBtn(left: number, top: number, text: string): { outer: SVGElement, inner: SVGElement } {
            const btnr = 2;
            const btnw = 20;
            const btnn = 1.6;
            const btnnm = 2;
            const btnb = 5;
            let btng = svg.child(this.g, "g", { class: "sim-button-group" });
            // var fo = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
            var fo = svg.child(btng, "foreignObject");
            fo.setAttribute("id", "y");
            fo.setAttribute("x", left+'');
            fo.setAttribute("y", top+'');
            fo.setAttribute("width", "140px");
            fo.setAttribute("height", "90px");
            fo.innerHTML = `<body xmlns="http://www.w3.org/1999/xhtml">
             <button class="simEventBtn">${text}</button>
          </body>`;
            // var ta = document.createElement("button");
            // ta.innerText = text;
            // fo.appendChild(ta);

            // svg.child(btng, "rect", { class: "sim-button-outer", x: left, y: top, rx: btnr, ry: btnr, width: btnw, height: btnw });
            // svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnnm, cy: top + btnnm, r: btnn });
            // svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnnm, cy: top + btnw - btnnm, r: btnn });
            // svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnw - btnnm, cy: top + btnw - btnnm, r: btnn });
            // svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnw - btnnm, cy: top + btnnm, r: btnn });

            const outer = btng;
            const inner = svg.child(btng, "circle", {
                class: "sim-button",
                cx: left + btnw / 2,
                cy: top + btnw / 2,
                r: 0
            });

            return { outer, inner };
        }

        private mkIconBtn(left: number, top: number, iconDataUri: string, ariaLabel: string): { outer: SVGElement, inner: SVGElement } {
            // Use mkBtnSvg for consistent A/B-like button geometry.
            // Create it at origin and then translate the whole group to (left, top)
            const btn = mkBtnSvg([0, 0]);
            let btng = btn.el as SVGGElement;

            // find inner circle created by mkBtnSvg
            const inner = btng.querySelector('.sim-button') as SVGElement;

            // place a centered foreignObject overlay for the icon
            const bb = btn; // has x,y,w,h returned
            const fo = svg.child(btng, "foreignObject");
            const iconSize = Math.min(36, Math.max(24, PIN_DIST * 1.2));
            // place icon relative to the group's internal coordinates (bb.x, bb.y)
            fo.setAttribute("x", (bb.x + (bb.w - iconSize) / 2) + '');
            fo.setAttribute("y", (bb.y + (bb.h - iconSize) / 2) + '');
            fo.setAttribute("width", iconSize + "");
            fo.setAttribute("height", iconSize + "");
            const img = iconDataUri ? `<img src="${iconDataUri}" alt="" aria-hidden="true" style="width:100%;height:100%;display:block;">` : "";
            const fallback = iconDataUri ? "" : ariaLabel;
            fo.innerHTML = `<body xmlns="http://www.w3.org/1999/xhtml" style="margin:0;padding:0;background:transparent;">
                      <button class="simEventBtn simGestureBtn" aria-label="${ariaLabel}" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
                          ${img}${fallback}
                      </button>
                  </body>`;

            // attach group class and translate to desired position
            U.addClass(btng, 'sim-button-group');
            translateEl(btng, [left, top]);
            return { outer: btng, inner };
        }

        private attachEvents() {
            // wait until we're actually in the dom
            setTimeout(() => {
                this.attachIFrameEvents();
                this.attachAccelerometerEvents();
                this.attachPinsTouchEvents();
                this.attachABEvents();
                this.attachAPlusBEvents();
                this.attachKeyboardEvents();
            });
        }

        private attachIFrameEvents() {
            Runtime.messagePosted = (msg) => {
                switch (msg.type || "") {
                    case "serial": this.flashSystemLed(); break;
                    case "radiopacket": this.flashAntenna(); break;
                    case "eventbus":
                        if ((<pxsim.SimulatorEventBusMessage>msg).id == DAL.MES_BROADCAST_GENERAL_ID)
                            this.flashAntenna();
                        break;
                }
            }
        }

        private attachAccelerometerEvents() {
<<<<<<< HEAD
            let tiltDecayer: any = undefined;
            const state = this.board;
=======
            // Always attach event listeners; the handlers will check `this.props.disableTilt`
            let tiltDecayer: any =  undefined;
            this.element.addEventListener(pointerEvents.move, (ev: MouseEvent) => {
                if (this.props && this.props.disableTilt) return;
                const state = this.board;
                if (!state.accelerometerState.accelerometer.isActive) return;
>>>>>>> hugo_wipboehm

            const startTiltDecay = () => {
                if (!tiltDecayer) {
                    const doDecay = () => {
                        let accx = state.accelerometerState.accelerometer.getX(MicroBitCoordinateSystem.RAW);
                        accx = Math.floor(Math.abs(accx) * 0.85) * (accx > 0 ? 1 : -1);
                        let accy = state.accelerometerState.accelerometer.getY(MicroBitCoordinateSystem.RAW);
                        accy = Math.floor(Math.abs(accy) * 0.85) * (accy > 0 ? 1 : -1);
                        let accz = -Math.sqrt(Math.max(0, 1023 * 1023 - accx * accx - accy * accy));
                        if (Math.abs(accx) <= 24 && Math.abs(accy) <= 24) {
                            cancelAnimationFrame(tiltDecayer);
                            tiltDecayer = 0;
                            accx = 0;
                            accy = 0;
                            accz = -1023;
                        }
                        else {
                            tiltDecayer = requestAnimationFrame(doDecay);
                        }
                        state.accelerometerState.accelerometer.update(accx, accy, accz);
                        this.updateTilt();
                    }
                    tiltDecayer = requestAnimationFrame(doDecay)
                }
            }

            const handleMove = (xPos: number, yPos: number, boardWidth: number, boardHeight: number) => {
                if (yPos > boardHeight || xPos < 0 || xPos > boardWidth) {
                    startTiltDecay();
                    return;
                }

                if (tiltDecayer) {
                    cancelAnimationFrame(tiltDecayer);
                    tiltDecayer = undefined;
                }

                const ax = (xPos - boardWidth / 2) / (boardWidth / 3);
                const ay = (yPos - boardHeight / 2) / (boardHeight / 3);

                const x = - Math.max(- 1023, Math.min(1023, Math.floor(ax * 1023)));
                const y = - Math.max(- 1023, Math.min(1023, Math.floor(ay * 1023)));
                const z2 = 1023 * 1023 - x * x - y * y;
                const z = Math.floor((z2 > 0 ? -1 : 1) * Math.sqrt(Math.abs(z2)));

                state.accelerometerState.accelerometer.update(x, y, z);
                this.updateTilt();
            }

            this.bindEvent(document, pointerEvents.move, (ev: MouseEvent) => {
                if (!state.accelerometerState.accelerometer.isActive) return;

                const boardElement = this.element as unknown as HTMLElement;
                const parentSvg = this.findParentElement();

                const xPos = ev.clientX != null ? ev.clientX : ev.pageX;
                const yPos = ev.clientY != null ? ev.clientY : ev.pageY;

                // The outermost SVG has a transform applied to it to create the tilt
                // effect. In order to give us a constant bounding box to work with,
                // we want to calculate the pre-transform bounds of the board element
                // we can do this by comparing the aspect ratio of the page to the
                // viewbox of the board SVG, since it should always be maximized within
                // the page.
                const pageBounds = document.body.getBoundingClientRect();

                if (parentSvg && parentSvg !== this.element) {
                    // If we are embedded in another SVG (e.g. the breadboard is present),
                    // we need to do some extra work to find the bounding box of the board
                    // element within the parent SVG.
                    const parentViewBoxWidth = parentSvg.viewBox.baseVal.width;
                    const parentViewBoxHeight = parentSvg.viewBox.baseVal.height;

                    const aspectRatio = parentViewBoxWidth / parentViewBoxHeight;

                    let parentWidth: number;
                    let parentHeight: number;

                    if (pageBounds.width / pageBounds.height > aspectRatio) {
                        parentHeight = pageBounds.height;
                        parentWidth = parentHeight * aspectRatio;
                    }
                    else {
                        parentWidth = pageBounds.width;
                        parentHeight = parentWidth / aspectRatio;
                    }

                    const parentLeft = pageBounds.left + (pageBounds.width - parentWidth) / 2;
                    const parentTop = pageBounds.top + (pageBounds.height - parentHeight) / 2;


                    const boardWidth = parseFloat(boardElement.getAttribute("width")!);
                    const boardHeight = parseFloat(boardElement.getAttribute("height")!);
                    const boardLeft = parseFloat(boardElement.getAttribute("x")!);
                    const boardTop = parseFloat(boardElement.getAttribute("y")!);

                    const boardPixelLeft = parentLeft + (boardLeft / parentViewBoxWidth) * parentWidth;
                    const boardPixelTop = parentTop + (boardTop / parentViewBoxHeight) * parentHeight;

                    const boardPixelWidth = (boardWidth / parentViewBoxWidth) * parentWidth;
                    const boardPixelHeight = (boardHeight / parentViewBoxHeight) * parentHeight;
                    handleMove(xPos - boardPixelLeft, yPos - boardPixelTop, boardPixelWidth, boardPixelHeight);
                }
                else {
                    const boardViewboxWidth = this.element.viewBox.baseVal.width;
                    const boardViewboxHeight = this.element.viewBox.baseVal.height;

                    const aspectRatio = boardViewboxWidth / boardViewboxHeight;

                    let boardWidth: number;
                    let boardHeight: number;

                    if (pageBounds.width / pageBounds.height > aspectRatio) {
                        boardHeight = pageBounds.height;
                        boardWidth = boardHeight * aspectRatio;
                    }
                    else {
                        boardWidth = pageBounds.width;
                        boardHeight = boardWidth / aspectRatio;
                    }

                    const boardLeft = pageBounds.left + (pageBounds.width - boardWidth) / 2;
                    const boardTop = pageBounds.top + (pageBounds.height - boardHeight) / 2;

                    handleMove(xPos - boardLeft, yPos - boardTop, boardWidth, boardHeight);
                }
            }, false);
<<<<<<< HEAD

            this.bindEvent(document, pointerEvents.leave, (ev: MouseEvent) => {
=======
            this.element.addEventListener(pointerEvents.leave, (ev: MouseEvent) => {
                if (this.props && this.props.disableTilt) return;
>>>>>>> hugo_wipboehm
                let state = this.board;
                if (!state.accelerometerState.accelerometer.isActive) return;

                startTiltDecay();
            }, false);
        }

        private attachPinsTouchEvents() {
            const pins = this.pins.slice(0, 5);

            for (let index = 0; index < pins.length; index++) {
                const pin = pins[index];

                const boundingBox = (pin as SVGPathElement).getBBox();

                const eventSurface = svg.child(
                    this.buttonGroup,
                    "rect",
                    {
                        "class": "button-rect",
                        x: boundingBox.x,
                        y: boundingBox.y - 10,
                        width: boundingBox.width,
                        height: boundingBox.height + 20
                    }
                );

                svg.title(eventSurface, pin.firstElementChild.textContent);

                let state = this.board;
                let pressedTime: number;

                for (const eventName of pointerEvents.down) {
                    eventSurface.addEventListener(eventName, () => {
                        // console.log(`down ${state.edgeConnectorState.pins[i].id}`)
                        state.edgeConnectorState.pins[index].touched = true;
                        if (index === 4) {
                            // logo touch: keep the dedicated Button state (read by
                            // input.logoIsPressed()) in sync and show press feedback
                            this.board.logoTouch.pressed = true;
                            U.addClass(pin, "touched");
                        }
                        this.updatePin(state.edgeConnectorState.pins[index], index);
                        this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_DOWN);
                        pressedTime = runtime.runningTime();
                    });
                }

                eventSurface.addEventListener(pointerEvents.up, () => {
                    let state = this.board;
                    // console.log(`up ${state.edgeConnectorState.pins[i].id}, index ${index}`)
                    state.edgeConnectorState.pins[index].touched = false;
                    if (index === 4) {
                        this.board.logoTouch.pressed = false;
                        U.removeClass(pin, "touched");
                    }
                    this.updatePin(state.edgeConnectorState.pins[index], index);
                    this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_UP);
                    const currentTime = runtime.runningTime()
                    if (currentTime - pressedTime > DAL.DEVICE_BUTTON_LONG_CLICK_TIME) {
                        this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_LONG_CLICK);
                        // console.log(`& long click`)
                    } else {
                        this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                        // console.log(`& click`)
                    }
                    pressedTime = undefined;
                });

                eventSurface.addEventListener(pointerEvents.enter, () => {
                    pin.classList.add("hover");
                });

                eventSurface.addEventListener(pointerEvents.leave, () => {
                    pin.classList.remove("hover");
                });

                eventSurface.addEventListener("focus", () => {
                    pin.classList.add("focused");
                });

                eventSurface.addEventListener("blur", () => {
                    pin.classList.remove("focused");
                });

                accessibility.enableKeyboardInteraction(eventSurface, undefined, () => {
                    let state = this.board;
                    this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_DOWN);
                    this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_UP);
                    this.board.bus.queue(state.edgeConnectorState.pins[index].id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                });

                const pinState = this.board.edgeConnectorState.pins[index]

                // the pin at index 4 is the logo, which doesn't support the dragging behavior
                if (!pinState || index === 4) continue;
                this.pinDragSurfaces[pinState.id] = eventSurface;

                let pt = this.element.createSVGPoint();
                let xpos = (index === 0 || index === 3) ? 300 : 520;
                let vMax = 1023;
                svg.buttonEvents(eventSurface,
                    // move
                    ev => {
<<<<<<< HEAD
                        let state = this.board;
                        let pin = state.edgeConnectorState.pins[index];
                        let svgpin = this.pins[index];
                        if (pin.mode & PinFlags.Input && !(pin.mode & PinFlags.Touch)) {
                            let cursor = svg.cursorPoint(pt, this.element, ev);
                            let maxValue = pin.mode & PinFlags.Analog ? 1023 : 1;
                            let v = (400 - cursor.y) / 40 * maxValue;
                            pin.value = Math.max(0, Math.min(maxValue, Math.floor(v)));
=======
                        if (pinState.mode & PinFlags.Input) {
                            let cursor = svg.cursorPoint(pt, this.element, ev);
                            let v = (xpos - cursor.y) / 70 * (vMax + 1);
                            pinState.value = Math.max(0, Math.min(vMax, Math.floor(v)));
>>>>>>> hugo_wipboehm
                        }
                        this.updatePin(pinState, index);
                    },
                    // start
                    ev => {
                        let svgpin = this.pins[index];
                        U.addClass(svgpin, "touched");
<<<<<<< HEAD
                        if (pin.mode & PinFlags.Input && !(pin.mode & PinFlags.Touch)) {
                            let cursor = svg.cursorPoint(pt, this.element, ev);
                            let maxValue = pin.mode & PinFlags.Analog ? 1023 : 1;
                            let v = (400 - cursor.y) / 40 * maxValue;
                            pin.value = Math.max(0, Math.min(maxValue, Math.floor(v)));
=======
                        if (pinState.mode & PinFlags.Input) {
                            let cursor = svg.cursorPoint(pt, this.element, ev);
                            let v = (xpos - cursor.y) / 70 * (vMax + 1);
                            pinState.value = Math.max(0, Math.min(vMax, Math.floor(v)));
>>>>>>> hugo_wipboehm
                        }
                        this.updatePin(pinState, index);
                    },
                    // stop
                    (ev: MouseEvent) => {
                        let svgpin = this.pins[index];
                        U.removeClass(svgpin, "touched");
                        this.updatePin(pinState, index);
                        return false;
                    },
                    // keydown
                    (ev: KeyboardEvent) => {
<<<<<<< HEAD
                        const state = this.board;
                        const pin = state.edgeConnectorState.pins[index];
                        const value = pinKeyHandler(ev, pin.value, 0, pin.mode & PinFlags.Analog ? 1023 : 1, pin.mode);
                        if (value !== undefined) {
                            pin.value = value;
                            this.updatePin(pin, index);
=======
                        let charCode = (typeof ev.which == "number") ? ev.which : ev.keyCode

                        if (charCode === 40 || charCode === 37) { // Down/Left arrow
                            ev.preventDefault();
                            pinState.value -= 10;
                            if (pinState.value < 0) {
                                pinState.value = 1023;
                            }
                            this.updatePin(pinState, index);
                        } else if (charCode === 38 || charCode === 39) { // Up/Right arrow
                            ev.preventDefault();
                            pinState.value += 10;
                            if (pinState.value > 1023) {
                                pinState.value = 0;
                            }
                            this.updatePin(pinState, index);
>>>>>>> hugo_wipboehm
                        }
                    });
            }
        }

        private attachABEvents() {
            const bpState = this.board.buttonPairState;
            const stateButtons: Button[] = [bpState.aBtn, bpState.bBtn];
            const elButtonOuters = this.buttonsOuter.slice(0, 2);
            const elButtons = this.buttons.slice(0, 2);

            for (let i = 0; i < elButtonOuters.length; i++) {
                const outerElement = elButtonOuters[i];
                const innerElement = elButtons[i];
                const state = stateButtons[i];

<<<<<<< HEAD
        attachButtonEvents(stateButton: Button, buttonOuter: SVGElement, elButton: SVGElement) {
            let pressedTime: number;
            pointerEvents.down.forEach(evid => buttonOuter.addEventListener(evid, ev => {
                stateButton.pressed = true;
                this.updateButtonPairs();
                this.board.bus.queue(stateButton.id, DAL.MICROBIT_BUTTON_EVT_DOWN);
                pressedTime = runtime.runningTime()
            }));
            buttonOuter.addEventListener(pointerEvents.leave, ev => {
                stateButton.pressed = false;
                this.updateButtonPairs();
                svg.fill(elButton, this.props.theme.buttonUp);
            })
            buttonOuter.addEventListener(pointerEvents.up, ev => {
                stateButton.pressed = false;
                this.updateButtonPairs();
                this.board.bus.queue(stateButton.id, DAL.MICROBIT_BUTTON_EVT_UP);
                const currentTime = runtime.runningTime()
                if (currentTime - pressedTime > DAL.DEVICE_BUTTON_LONG_CLICK_TIME)
                    this.board.bus.queue(stateButton.id, DAL.MICROBIT_BUTTON_EVT_LONG_CLICK);
                else
                    this.board.bus.queue(stateButton.id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                pressedTime = undefined;
            })
            accessibility.enableKeyboardInteraction(buttonOuter,
                () => { // keydown
                    stateButton.pressed = true;
                    this.updateButtonPairs();
                    this.board.bus.queue(stateButton.id, DAL.MICROBIT_BUTTON_EVT_DOWN);
                }, () => { // keyup
                    stateButton.pressed = false;
                    this.updateButtonPairs();
                    this.board.bus.queue(stateButton.id, DAL.MICROBIT_BUTTON_EVT_UP);
                    this.board.bus.queue(stateButton.id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                });
=======
                const boundingBox = (outerElement as SVGPathElement).getBBox();

                const eventSurface = svg.child(
                    this.buttonGroup,
                    "rect",
                    {
                        "class": "button-rect",
                        x: boundingBox.x,
                        y: boundingBox.y,
                        width: boundingBox.width,
                        height: boundingBox.height
                    }
                );

                svg.title(eventSurface, innerElement.firstElementChild.textContent);

                let pressedTime: number;

                for (const eventName of pointerEvents.down) {
                    eventSurface.addEventListener(eventName, () => {
                        state.pressed = true;
                        svg.fill(innerElement, this.props.theme.buttonDown);
                        this.board.bus.queue(state.id, DAL.MICROBIT_BUTTON_EVT_DOWN);
                        pressedTime = runtime.runningTime();
                    });
                }

                eventSurface.addEventListener(pointerEvents.enter, () => {
                    outerElement.classList.add("hover");
                });

                eventSurface.addEventListener(pointerEvents.leave, () => {
                    outerElement.classList.remove("hover");
                });

                eventSurface.addEventListener(pointerEvents.leave, () => {
                    state.pressed = false;
                    svg.fill(innerElement, this.props.theme.buttonUps[i]);
                });

                eventSurface.addEventListener(pointerEvents.up, () => {
                    state.pressed = false;
                    svg.fill(innerElement, this.props.theme.buttonUps[i]);
                    this.board.bus.queue(state.id, DAL.MICROBIT_BUTTON_EVT_UP);
                    const currentTime = runtime.runningTime();
                    if (currentTime - pressedTime > DAL.DEVICE_BUTTON_LONG_CLICK_TIME) {
                        this.board.bus.queue(state.id, DAL.MICROBIT_BUTTON_EVT_LONG_CLICK);
                    }
                    else {
                        this.board.bus.queue(state.id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                    }
                    pressedTime = undefined;
                });

                accessibility.enableKeyboardInteraction(eventSurface, undefined, () => {
                    this.board.bus.queue(state.id, DAL.MICROBIT_BUTTON_EVT_DOWN);
                    this.board.bus.queue(state.id, DAL.MICROBIT_BUTTON_EVT_UP);
                    this.board.bus.queue(state.id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                });
            }
>>>>>>> hugo_wipboehm
        }

        private attachAPlusBEvents() {
            const bpState = this.board.buttonPairState;
            const stateButtons: Button[] = [bpState.aBtn, bpState.bBtn];
            let pressedTime: number;
            // A+B
            pointerEvents.down.forEach(evid => this.buttonsOuter[2].addEventListener(evid, ev => {
                bpState.aBtn.pressed = true;
                bpState.bBtn.pressed = true;
                bpState.abBtn.pressed = true;
                this.updateButtonPairs();
                this.board.bus.queue(bpState.abBtn.id, DAL.MICROBIT_BUTTON_EVT_DOWN);
                pressedTime = runtime.runningTime()
            }));
            this.buttonsOuter[2].addEventListener(pointerEvents.leave, ev => {
                bpState.aBtn.pressed = false;
                bpState.bBtn.pressed = false;
                bpState.abBtn.pressed = false;
                this.updateButtonPairs();
            })
            this.buttonsOuter[2].addEventListener(pointerEvents.up, ev => {
                bpState.aBtn.pressed = false;
                bpState.bBtn.pressed = false;
                bpState.abBtn.pressed = false;
                this.updateButtonPairs();

                this.board.bus.queue(stateButtons[0].id, DAL.MICROBIT_BUTTON_EVT_UP);
                this.board.bus.queue(stateButtons[1].id, DAL.MICROBIT_BUTTON_EVT_UP);
                this.board.bus.queue(bpState.abBtn.id, DAL.MICROBIT_BUTTON_EVT_UP);
                const currentTime = runtime.runningTime()
                if (currentTime - pressedTime > DAL.DEVICE_BUTTON_LONG_CLICK_TIME)
                    this.board.bus.queue(bpState.abBtn.id, DAL.MICROBIT_BUTTON_EVT_LONG_CLICK);
                else
                    this.board.bus.queue(bpState.abBtn.id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                pressedTime = undefined;
            });

            accessibility.enableKeyboardInteraction(this.buttonsOuter[2],
                () => { // keydown
                    bpState.aBtn.pressed = true;
                    bpState.bBtn.pressed = true;
                    bpState.abBtn.pressed = true;
                    this.updateButtonPairs();
                    this.board.bus.queue(bpState.abBtn.id, DAL.MICROBIT_BUTTON_EVT_DOWN);
                }, () => { // keyup
                    bpState.aBtn.pressed = false;
                    bpState.bBtn.pressed = false;
                    bpState.abBtn.pressed = false;
                    this.updateButtonPairs();
                    this.board.bus.queue(bpState.abBtn.id, DAL.MICROBIT_BUTTON_EVT_UP);
                    this.board.bus.queue(bpState.abBtn.id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                }
            );
        }

        private attachKeyboardEvents() {
            accessibility.postKeyboardEvent();
        }

        private bindEvent(element: Element | Document, eventName: string, handler: (e: Event) => void, ...rest: any[]) {
            element.addEventListener(eventName, handler, ...rest);
            this.bindings.push({ element, event: eventName, handler });
        }
    }

    const isHandledKey = (key: string) => {
        return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "PageUp", "PageDown", "Home", "End"].includes(key);
    }

    const getSliderStepValue = (min: number, max: number) => {
        const range = max - min;
        // Assumes slider values are always integers.
        return Math.max(1, Math.floor(range / 10));
    }

    const commonKeyHandler = (e: KeyboardEvent, currentValue: number, min: number, max: number): number | undefined => {
        const key = e.key;
        if (isHandledKey(key)) {
            e.preventDefault();
        }
        switch (key) {
            case "ArrowDown":
            case "ArrowLeft": {
                return Math.max(min, currentValue - 1)
            }
            case "ArrowUp":
            case "ArrowRight": {
                return Math.min(max, currentValue + 1)
            }
            case "Home": {
                return min;
            }
            case "End": {
                return max;
            }
            case "PageDown": {
                const step = getSliderStepValue(min, max);
                const value = currentValue - step;
                return Math.max(min, value)
            }
            case "PageUp": {
                const step = getSliderStepValue(min, max);
                const value = currentValue + step;
                return Math.min(max, value)
            }
        }
        return undefined;
    }

    const pinKeyHandler = (e: KeyboardEvent, currentValue: number, min: number, max: number, pinMode: PinFlags): number | undefined => {
        const key = e.key;
        if (isHandledKey(key)) {
            if (!(pinMode & PinFlags.Input)) {
                e.preventDefault();
                accessibility.setLiveContent(pxsim.localization.lf("This pin is read-only"));
                return undefined;
            }
            if (pinMode & PinFlags.Touch) {
                // The pin is in touch mode and has button markup, not a slider.
                e.preventDefault();
                return undefined;
            }
        }
        // The pin value for a digital pin may be higher than 1 depending on how its value was set.
        const currentValueClamped = Math.min(max, currentValue);
        return commonKeyHandler(e, currentValueClamped, min, max);
    }
}
