import { SIDE, MATERIALS, LINES_Y_DIFFERENCE } from "./commonConstants"

/*
 *  EGG CONSTANTS
 */

const startTopY        = 210
const startBottomY     = startTopY - LINES_Y_DIFFERENCE
const stepY            = 18
const endTopY          = startTopY - (stepY * 3)
const endBottomY       = startBottomY - (stepY * 3)

const startX           = 176
const stepX            = 45
const endX             = startX - (stepX * 3)

const dropY            = -125
const dropLeft         = { x: -endX, y: dropY }
const dropRight        = { x:  endX, y: dropY }

const topLeftSteps     = { linePoints: [{x: -startX, y: startTopY   }, {x: -(startX - stepX), y: startTopY - stepY   }, {x: -(startX - (stepX*2)), y: startTopY - (stepY*2)   }, {x: -endX, y: endTopY   }, dropLeft]  , side: SIDE.LEFT }
const bottomLeftSteps  = { linePoints: [{x: -startX, y: startBottomY}, {x: -(startX - stepX), y: startBottomY - stepY}, {x: -(startX - (stepX*2)), y: startBottomY - (stepY*2)}, {x: -endX, y: endBottomY}, dropLeft]  , side: SIDE.LEFT }
const topRightSteps    = { linePoints: [{x:  startX, y: startTopY   }, {x:  (startX - stepX), y: startTopY - stepY   }, {x:  (startX - (stepX*2)), y: startTopY - (stepY*2)   }, {x:  endX, y: endTopY   }, dropRight] , side: SIDE.RIGHT }
const bottomRightSteps = { linePoints: [{x:  startX, y: startBottomY}, {x:  (startX - stepX), y: startBottomY - stepY}, {x:  (startX - (stepX*2)), y: startBottomY - (stepY*2)}, {x:  endX, y: endBottomY}, dropRight] , side: SIDE.RIGHT }
const globalRoutes     = [ topLeftSteps, topRightSteps, bottomLeftSteps, bottomRightSteps ]

export const EGG_COORDINATES = {
    GLOBAL_ROUTES: globalRoutes,
    Y_TOP_ROW: endTopY,
    Y_BOTTOM_ROW: endBottomY
}

export const EGG_VIRUS_RED = (weight = 0) => {
    return {
        ID: 'EGG_VIRUS_RED',
        SCALE_X: 650,
        SCALE_Y: 650,
        WEIGHT: weight,
        MATERIAL: {
            LEFT: MATERIALS.VIRUS_RED_LEFT,
            RIGHT: MATERIALS.VIRUS_RED_RIGHT
        },
        STAT_ICON: {
            X: 45,
            Y: 282,
            SCALE_X: 408,
            SCALE_Y: 382,
            MATERIAL: MATERIALS.VIRUS_RED_LEFT
        }
    }
}

export const EGG_VIRUS_BLUE = (weight = 0) => {
    return {
        ID: 'EGG_VIRUS_BLUE',
        SCALE_X: 650,
        SCALE_Y: 650,
        WEIGHT: weight,
        MATERIAL: {
            LEFT: MATERIALS.VIRUS_BLUE_LEFT,
            RIGHT: MATERIALS.VIRUS_BLUE_RIGHT
        },
        STAT_ICON: {
            X: 45,
            Y: 282,
            SCALE_X: 408,
            SCALE_Y: 382,
            MATERIAL: MATERIALS.VIRUS_BLUE_LEFT
        }
    }
}

export const EGG_MASK_GREEN = (weight = 0) => {
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
            X: 128,
            Y: 282,
            SCALE_X: 437,
            SCALE_Y: 316,
            MATERIAL: MATERIALS.MASK_GREEN
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