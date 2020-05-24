/*
 *  VIRUS CONSTANTS
 */

const dropLeft         = { x: -50, y: -180 }
const dropRight        = { x:  50, y: -180 }
const topLeftSteps     = [{ x: -155, y: 215 }, { x: -120, y: 200 }, { x: -85, y: 185 }, { x: -50, y: 170 }, dropLeft]
const bottomLeftSteps  = [{ x: -155, y:  65 }, { x: -120, y:  50 }, { x: -85, y:  35 }, { x: -50, y:  20 }, dropLeft]
const topRightSteps    = [{ x:  155, y: 215 }, { x:  120, y: 200 }, { x:  85, y: 185 }, { x:  50, y: 170 }, dropRight]
const bottomRightSteps = [{ x:  155, y:  65 }, { x:  120, y:  50 }, { x:  85, y:  35 }, { x:  50, y:  20 }, dropRight]
const globalRoutes     = [ topLeftSteps, bottomLeftSteps, topRightSteps, bottomRightSteps ]

export const VIRUS_COORDINATES = {
    GLOBAL_ROUTES: globalRoutes
}

export const VIRUS_RED_RIGHT = {
    ID: 'VIRUS_RED_RIGHT',
    MATERIAL: 'virus-red-right',
    SCALE_X: 650,
    SCALE_Y: 650
}

export const VIRUS_RED_LEFT = {
    ...VIRUS_RED_RIGHT,
    ID: 'VIRUS_RED_LEFT',
    MATERIAL: 'virus-red-left'
}

export const VIRUS_BLUE_RIGHT = {
    ID: 'VIRUS_BLUE_RIGHT',
    MATERIAL: 'virus-blue-right',
    SCALE_X: 650,
    SCALE_Y: 650
}

export const VIRUS_BLUE_LEFT = {
    ...VIRUS_BLUE_RIGHT,
    ID: 'VIRUS_BLUE_LEFT',
    MATERIAL: 'virus-blue-left'
}