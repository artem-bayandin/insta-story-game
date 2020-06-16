import { log } from "./utils"
import { MATERIALS } from './materials'

export const SIDE = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    TOP: 'TOP',
    BOTTOM: 'BOTTOM',
    NEUTRAL: 'NEUTRAL'
}

export const PATCHES = {
    INPUTS: {
        ROAD: {
            DURATION: 'roadDuration'
        },
        PLAYING: 'playing',
    },
    OUTPUTS: {
        MOVE_PLAYER: {
            LEFT: 'movePlayerLeft',
            RIGHT: 'movePlayerRight',
        },
        TAPPED: 'tapped',
    }
}

/*
 * OTHER ICONS THAT ARE NEITHER EGGS NOR MASKS NOR PLAYER
 */

export const OUT_OF_THE_SCREEN = {
    STAT_ICON: {
        X: 400,
        Y: 800,
        SCALE_X: 10,
        SCALE_Y: 10,
        MATERIAL: MATERIALS.STOPWATCH
    }
}

export const TOPROW_ICON_COORDINATES = {
    STOPWATCH: {
        X: -160,
        Y: 283
    },
    LEVEL: {
        X: -35,
        Y: 281
    },
    EGG: {
        X: 45,
        Y: 282
    },
    LIVES: {
        X: 128,
        Y: 282
    }
}

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

export const STATS_LINE_BG = {
    X: 0,
    Y: 282,
    SCALE_X: 4000,
    SCALE_Y: 500,
    MATERIAL: MATERIALS.STATS_LINE_BG
}

export const LINES_Y_DIFFERENCE = 150
const LINE_SCALE_X = 1350
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

export const AVOID_COLLECT_POSITION = {
    AVOID: {
        START: {
            X: -28,
            Y: 0
        },
        STEP: {
            X: 40,
            Y: 0
        }
    },
    COLLECT: {
        START: {
            X: -9,
            Y: -30
        },
        STEP: {
            X: 40,
            Y: 0
        }
    }
}

export const INTERACTION_POSITION = {
    INITIAL: {
        X: 0,
        Y: 228
    },
    FINAL: {
        X: 0,
        Y: 200
    },
    SPEED: 5
}

const finalStatsTextX = 25
const finalStatsIconX = -finalStatsTextX
const finalStatsTopY = 145
const finslStatsStepY = 50

export const FINAL_STATS_POSITION = {
    TIMER: {
        ICON: {
            X: finalStatsIconX,
            Y: finalStatsTopY
        },
        TEXT: {
            X: finalStatsTextX,
            Y: finalStatsTopY
        }
    },
    LEVEL: {
        ICON: {
            X: finalStatsIconX,
            Y: finalStatsTopY - finslStatsStepY
        },
        TEXT: {
            X: finalStatsTextX,
            Y: finalStatsTopY - finslStatsStepY
        }
    },
    EGGS: {
        ICON: {
            X: finalStatsIconX,
            Y: finalStatsTopY - finslStatsStepY * 2
        },
        TEXT: {
            X: finalStatsTextX,
            Y: finalStatsTopY - finslStatsStepY * 2
        }
    },
    LIVES: {
        ICON: {
            X: finalStatsIconX,
            Y: finalStatsTopY - finslStatsStepY * 3
        },
        TEXT: {
            X: finalStatsTextX,
            Y: finalStatsTopY - finslStatsStepY * 3
        }
    }
}