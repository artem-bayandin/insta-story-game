/*
 *  EGG CONSTANTS
 */

import { SIDE } from "./commonConstants"

const yTopRow          = 170
const yBottomRow       = 20
const dropLeft         = { x: -50, y: -180 }
const dropRight        = { x:  50, y: -180 }
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

export const EGG_VIRUS_RED = {
    ID: 'EGG_VIRUS_RED',
    SCALE_X: 650,
    SCALE_Y: 650,
    WEIGHT: -1,
    MATERIAL: {
        LEFT: 'virus-red-left',
        RIGHT: 'virus-red-right'
    }
}

export const EGG_VIRUS_BLUE = {
    ID: 'EGG_VIRUS_BLUE',
    SCALE_X: 650,
    SCALE_Y: 650,
    WEIGHT: -1,
    MATERIAL: {
        LEFT: 'virus-blue-left',
        RIGHT: 'virus-blue-right'
    }
}

export const EGG_MASK_GREEN = {
    ID: 'EGG_VIRUS_MASK',
    SCALE_X: 700,
    SCALE_Y: 500,
    WEIGHT: +1,
    MATERIAL: {
        LEFT: 'mask-green',
        RIGHT: 'mask-green'
    }
}