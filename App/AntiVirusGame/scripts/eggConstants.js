import { SIDE, LINES_Y_DIFFERENCE } from './commonConstants'
import { MATERIALS } from './materials'

/*
 *  EGG CONSTANTS
 */

const startTopY        = 218
const startBottomY     = startTopY - LINES_Y_DIFFERENCE
const stepY            = 21
const endTopY          = startTopY - (stepY * 3)
const endBottomY       = startBottomY - (stepY * 3)

const startX           = 179
const stepX            = 46
const endX             = startX - (stepX * 3)

const dropY            = -100
const dropLeft         = { x: -endX, y: dropY }
const dropRight        = { x:  endX, y: dropY }

const topLeftSteps     = { linePoints: [{x: -startX, y: startTopY   }, {x: -(startX - stepX), y: startTopY - stepY   }, {x: -(startX - (stepX*2)), y: startTopY - (stepY*2)   }, {x: -endX, y: endTopY   }, dropLeft]  , sides: {x: SIDE.LEFT, y: SIDE.TOP} }
const bottomLeftSteps  = { linePoints: [{x: -startX, y: startBottomY}, {x: -(startX - stepX), y: startBottomY - stepY}, {x: -(startX - (stepX*2)), y: startBottomY - (stepY*2)}, {x: -endX, y: endBottomY}, dropLeft]  , sides: {x: SIDE.LEFT, y: SIDE.BOTTOM} }
const topRightSteps    = { linePoints: [{x:  startX, y: startTopY   }, {x:  (startX - stepX), y: startTopY - stepY   }, {x:  (startX - (stepX*2)), y: startTopY - (stepY*2)   }, {x:  endX, y: endTopY   }, dropRight] , sides: {x: SIDE.RIGHT, y: SIDE.TOP} }
const bottomRightSteps = { linePoints: [{x:  startX, y: startBottomY}, {x:  (startX - stepX), y: startBottomY - stepY}, {x:  (startX - (stepX*2)), y: startBottomY - (stepY*2)}, {x:  endX, y: endBottomY}, dropRight] , sides: {x: SIDE.RIGHT, y: SIDE.BOTTOM} }
const globalRoutes     = [ topLeftSteps, topRightSteps, bottomLeftSteps, bottomRightSteps ]

export const EGG_COORDINATES = {
    GLOBAL_ROUTES: globalRoutes,
    Y_TOP_ROW: endTopY,
    Y_BOTTOM_ROW: endBottomY
}

export const EGG_VIRUS_RED = (weight = 0) => { // KILLER
    return {
        ID: 'EGG_VIRUS_RED',
        SCALE_X: 640,
        SCALE_Y: 640,
        WEIGHT: weight,
        MATERIAL: {
            LEFT: MATERIALS.VIRUS_RED_LEFT,
            RIGHT: MATERIALS.VIRUS_RED_RIGHT
        },
        STAT_ICON: {
            SCALE_X: 400,
            SCALE_Y: 400,
            MATERIAL: MATERIALS.VIRUS_RED_LEFT
        },
        AC_ICON: {
            SCALE_X: 300,
            SCALE_Y: 300,
        }
    }
}

export const EGG_VIRUS_BLUE = (weight = 0) => { // KILLER
    return {
        ID: 'EGG_VIRUS_BLUE',
        SCALE_X: 640,
        SCALE_Y: 640,
        WEIGHT: weight,
        MATERIAL: {
            LEFT: MATERIALS.VIRUS_BLUE_LEFT,
            RIGHT: MATERIALS.VIRUS_BLUE_RIGHT
        },
        STAT_ICON: {
            SCALE_X: 400,
            SCALE_Y: 400,
            MATERIAL: MATERIALS.VIRUS_BLUE_LEFT
        },
        AC_ICON: {
            SCALE_X: 300,
            SCALE_Y: 300,
        }
    }
}

export const EGG_MASK_GREEN = (weight = 0) => { // HEALER
    return {
        ID: 'EGG_VIRUS_MASK',
        SCALE_X: 700,
        SCALE_Y: 500,
        WEIGHT: weight,
        MATERIAL: {
            LEFT: MATERIALS.MASK_GREEN,
            RIGHT: MATERIALS.MASK_GREEN
        },
        STAT_ICON: {
            SCALE_X: 437,
            SCALE_Y: 316,
            MATERIAL: MATERIALS.MASK_GREEN
        },
        AC_ICON: {
            SCALE_X: 400,
            SCALE_Y: 300,
        }
    }
}

export const TZAR_EGG_WEIGHT = 777

export const TZAR_EGG_1 = {
    ID: 'TZAR_EGG_1',
    SCALE_X: 1000,
    SCALE_Y: 1000,
    WEIGHT: TZAR_EGG_WEIGHT,
    MATERIAL: {
        DEFAULT: MATERIALS.MASK_GREEN,
        LEFT: MATERIALS.MASK_GREEN,
        RIGHT: MATERIALS.MASK_GREEN
    }
}

export const EGG_POTATO = (weight = 0) => { // HEALER
    return {
        ID: 'EGG_POTATO',
        SCALE_X: 560,
        SCALE_Y: 640,
        WEIGHT: weight,
        MATERIAL: {
            LEFT: MATERIALS.POTATO_LEFT,
            RIGHT: MATERIALS.POTATO_RIGHT
        },
        STAT_ICON: {
            SCALE_X: 350,
            SCALE_Y: 400,
            MATERIAL: MATERIALS.POTATO_LEFT
        },
        AC_ICON: {
            SCALE_X: 262,
            SCALE_Y: 300,
        }
    }
}

export const EGG_DOLLAR = (weight = 0) => { // KILLER
    return {
        ID: 'EGG_DOLLAR',
        SCALE_X: 440,
        SCALE_Y: 640,
        WEIGHT: weight,
        MATERIAL: {
            LEFT: MATERIALS.DOLLAR,
            RIGHT: MATERIALS.DOLLAR
        },
        STAT_ICON: {
            SCALE_X: 275,
            SCALE_Y: 400,
            MATERIAL: MATERIALS.DOLLAR
        },
        AC_ICON: {
            SCALE_X: 206,
            SCALE_Y: 300,
        }
    }
}

export const EGG_FIRE = (weight = 0) => { // KILLER
    return {
        ID: 'EGG_FIRE',
        SCALE_X: 480,
        SCALE_Y: 640,
        WEIGHT: weight,
        MATERIAL: {
            LEFT: MATERIALS.FIRE,
            RIGHT: MATERIALS.FIRE
        },
        STAT_ICON: {
            SCALE_X: 300,
            SCALE_Y: 400,
            MATERIAL: MATERIALS.FIRE
        },
        AC_ICON: {
            SCALE_X: 225,
            SCALE_Y: 300,
        }
    }
}

export const EGG_PAPER = (weight = 0) => { // HEALER
    return {
        ID: 'EGG_PAPER',
        SCALE_X: 560,
        SCALE_Y: 640,
        WEIGHT: weight,
        MATERIAL: {
            LEFT: MATERIALS.PAPER_LEFT,
            RIGHT: MATERIALS.PAPER_RIGHT
        },
        STAT_ICON: {
            SCALE_X: 350,
            SCALE_Y: 400,
            MATERIAL: MATERIALS.PAPER_LEFT
        },
        AC_ICON: {
            SCALE_X: 262,
            SCALE_Y: 300,
        }
    }
}