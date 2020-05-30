export const SIDE = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    TOP: 'TOP',
    BOTTOM: 'BOTTOM',
    NEUTRAL: 'NEUTRAL'
}

export const OBJECT_ID = {
    PLAYER: 'player',
    EGG1: 'egg1',
    EGG2: 'egg2',
    EGG3: 'egg3',
    EGG4: 'egg4',
    GAMEPAD: {
        LEFT_TOP: 'btn-left-top',
        RIGHT_TOP: 'btn-right-top',
        LEFT_BOTTOM: 'btn-left-bottom',
        RIGHT_BOTTOM: 'btn-right-bottom',
        PAUSE: 'btn-pause'
    },
    TXT: {
        LEVEL: 'txtLevel',
        EGGS: 'txtEggs',
        LIVES: 'txtLives',
        TIMER: 'txtTimer',
        INTERACTION: 'txtInteraction'
    },
    ICONS: {
        STOPWATCH: 'timerStatIcon',
        LEVEL: 'levelStatIcon',
        EGG: 'eggStatIcon',
        LIVES: 'livesStatIcon',
        STATS_LINE_BG: 'statsLineBackground'
    },
    LINES: {
        LEFT_TOP: 'left-top',
        RIGHT_TOP: 'right-top',
        LEFT_BOTTOM: 'left-bottom',
        RIGHT_BOTTOM: 'right-bottom',
    }
}

export const MATERIALS = {
    VIRUS_RED_LEFT: 'virus-red-left',
    VIRUS_RED_RIGHT: 'virus-red-right',
    VIRUS_BLUE_LEFT: 'virus-blue-left',
    VIRUS_BLUE_RIGHT: 'virus-blue-right',
    MASK_GREEN: 'mask-green',
    TRACTOR: 'belarus-1',
    FACE_WITH_MASK: 'face-2',
    STOPWATCH: 'stopwatch-1',
    LEVEL: 'speed-1',
    LINE_DEFAULT: 'line-grad',
    STATS_LINE_BG: 'statsLineMaterial',
    LINE_GRAD: 'line-grad'
}

export const PATCHES = {
    INPUTS: {
        PLAYER_COORDS: {
            MAX_LEFT: 'playerCoordMaxLeft',
            MAX_RIGHT: 'playerCoordMaxRight',
            MAX_TOP: 'playerCoordMaxTop',
            MAX_BOTTOM: 'playerCoordMaxBottom'
        },
        ROAD: {
            MOVE: 'moveTheRoad'
        },
        INTERACTION_VISIBLE: 'interactionVisible'
    },
    OUTPUTS: {
        MOVE_PLAYER: {
            LEFT: 'movePlayerLeft',
            RIGHT: 'movePlayerRight',
            TOP: 'movePlayerTop',
            BOTTOM: 'movePlayerBottom'
        },
        DEVICE: {
            SCREEN_SIZE: {
                X: 'deviceScreenSizeX',
                Y: 'deviceScreenSizeY'
            },
            SCREEN_SCALE: 'deviceScreenScale'
        },
        VIDEO_RECORDING: 'videoRecording'
    }
}

/*
 * OTHER ICONS THAT ARE NEITHER EGGS NOR MASKS NOR PLAYER
 */

export const STOPWATCH = {
    STAT_ICON: {
        X: -160,
        Y: 283,
        SCALE_X: 315,
        SCALE_Y: 350,
        MATERIAL: MATERIALS.STOPWATCH
    }
}

export const LEVEL = {
    STAT_ICON: {
        X: -35,
        Y: 281,
        SCALE_X: 400,
        SCALE_Y: 400,
        MATERIAL: MATERIALS.LEVEL
    }
}

export const STATS_LINE_BG = {
    X: 0,
    Y: 282,
    SCALE_X: 4000,
    SCALE_Y: 500,
    MATERIAL: MATERIALS.STATS_LINE_BG
}

export const LINES_Y_DIFFERENCE = 150
const LINE_SCALE_X = 1280
const LINE_SCALE_Y = 160
const LINE_X = 140
const LINE_Y_TOP = 165
const LINE_Y_BOTTOM = LINE_Y_TOP - LINES_Y_DIFFERENCE

export const LINES = {
    LEFT_TOP: {
        X: 0 - LINE_X,
        Y: LINE_Y_TOP,
        SCALE_X: LINE_SCALE_X,
        SCALE_Y: LINE_SCALE_Y,
        MATERIAL: MATERIALS.LINE_GRAD
    },
    RIGHT_TOP: {
        X: LINE_X,
        Y: LINE_Y_TOP,
        SCALE_X: LINE_SCALE_X,
        SCALE_Y: LINE_SCALE_Y,
        MATERIAL: MATERIALS.LINE_GRAD
    },
    LEFT_BOTTOM: {
        X: 0 - LINE_X,
        Y: LINE_Y_BOTTOM,
        SCALE_X: LINE_SCALE_X,
        SCALE_Y: LINE_SCALE_Y,
        MATERIAL: MATERIALS.LINE_GRAD
    },
    RIGHT_BOTTOM: {
        X: LINE_X,
        Y: LINE_Y_BOTTOM,
        SCALE_X: LINE_SCALE_X,
        SCALE_Y: LINE_SCALE_Y,
        MATERIAL: MATERIALS.LINE_GRAD
    }
}

export const STAT_TXT = {
    TIMER: {
        X: -125,
        Y: 280
    },
    LEVEL: {
        X: 4,
        Y: 280
    },
    EGGS: {
        X: 84,
        Y: 280
    },
    LIVES: {
        X: 167,
        Y: 280
    }
}

export const INTERACTION_RESULTS = {
    OUCH: 'OOUCH :(',
    EXTRA_LIFE: '+ EXTRA LIFE',
    GOOD: 'GOOD',
    GREAT: 'GREAT!',
    PERFECT: 'PERFECT!!!',
    GAME_OVER: 'GAME OVER.',
    WIN: 'WINNER!'
}