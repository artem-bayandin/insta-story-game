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

export const VIRUS_DEFAULT = {
    ID: 'VIRUS_DEFAULT',
    MATERIAL: 'virus-1',
    SCALE_X: 666,
    SCALE_Y: 623
}

export const VIRUS_BLUE = {
    ID: 'VIRUS_BLUE',
    MATERIAL: 'virus-blue',
    SCALE_X: 666,
    SCALE_Y: 623
}