/*
 *  EGG CONSTANTS
 */

import { SIDE, MATERIALS } from "./commonConstants"

const yTopRow          = 170
const yBottomRow       = 20
const dropLeft         = { x: -50, y: -155 }
const dropRight        = { x:  50, y: -155 }
const topLeftSteps     = { linePoints: [{ x: -155, y: 215 }, { x: -120, y: 200 }, { x: -85, y: 185 }, { x: -50, y: yTopRow    }, dropLeft]  , side: SIDE.LEFT }
const bottomLeftSteps  = { linePoints: [{ x: -155, y:  65 }, { x: -120, y:  50 }, { x: -85, y:  35 }, { x: -50, y: yBottomRow }, dropLeft]  , side: SIDE.LEFT }
const topRightSteps    = { linePoints: [{ x:  155, y: 215 }, { x:  120, y: 200 }, { x:  85, y: 185 }, { x:  50, y: yTopRow    }, dropRight] , side: SIDE.RIGHT }
const bottomRightSteps = { linePoints: [{ x:  155, y:  65 }, { x:  120, y:  50 }, { x:  85, y:  35 }, { x:  50, y: yBottomRow }, dropRight] , side: SIDE.RIGHT }
const globalRoutes     = [ topLeftSteps, topRightSteps, bottomLeftSteps, bottomRightSteps ]

export const EGG_COORDINATES = {
    GLOBAL_ROUTES: globalRoutes,
    Y_TOP_ROW: yTopRow,
    Y_BOTTOM_ROW: yBottomRow
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
            X: 50,
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
            X: 50,
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
            X: 133,
            Y: 282,
            SCALE_X: 437,
            SCALE_Y: 316,
            MATERIAL: MATERIALS.MASK_GREEN
        }
    }
}