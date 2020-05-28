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
        TIMER: 'txtTimer'
    },
    ICONS: {
        STOPWATCH: 'timerStatIcon',
        LEVEL: 'levelStatIcon',
        EGG: 'eggStatIcon',
        LIVES: 'livesStatIcon',
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
    LINE_DEFAULT: 'mat-line'
}

export const PATCHES = {
    INPUTS: {
        PLAYER_COORDS: {
            MAX_LEFT: 'playerCoordMaxLeft',
            MAX_RIGHT: 'playerCoordMaxRight',
            MAX_TOP: 'playerCoordMaxTop',
            MAX_BOTTOM: 'playerCoordMaxBottom'
        }
    },
    OUTPUTS: {
        MOVE_PLAYER: {
            LEFT: 'movePlayerLeft',
            RIGHT: 'movePlayerRight',
            TOP: 'movePlayerTop',
            BOTTOM: 'movePlayerBottom'
        }
    }
}

/*
 * OTHER ICONS THAT ARE NEITHER EGGS NOR MASKS NOR PLAYER
 */

export const STOPWATCH = {
    STAT_ICON: {
        SCALE_X: 315,
        SCALE_Y: 350,
        MATERIAL: MATERIALS.STOPWATCH
    }
}

export const LEVEL = {
    STAT_ICON: {
        SCALE_X: 400,
        SCALE_Y: 400,
        MATERIAL: MATERIALS.LEVEL
    }
}

export const LINES = {
    LEFT: {
        SCALE_X: 1200,
        SCALE_Y: 500,
        MATERIAL: MATERIALS.LINE_DEFAULT
    },
    RIGHT: {
        SCALE_X: 1200,
        SCALE_Y: 500,
        MATERIAL: MATERIALS.LINE_DEFAULT
    }
}