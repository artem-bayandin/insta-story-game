/*
 *  EGG CONSTANTS
 */

const dropLeft         = { x: -50, y: -180 }
const dropRight        = { x:  50, y: -180 }
const topLeftSteps     = [{ x: -155, y: 215 }, { x: -120, y: 200 }, { x: -85, y: 185 }, { x: -50, y: 170 }, dropLeft]
const bottomLeftSteps  = [{ x: -155, y:  65 }, { x: -120, y:  50 }, { x: -85, y:  35 }, { x: -50, y:  20 }, dropLeft]
const topRightSteps    = [{ x:  155, y: 215 }, { x:  120, y: 200 }, { x:  85, y: 185 }, { x:  50, y: 170 }, dropRight]
const bottomRightSteps = [{ x:  155, y:  65 }, { x:  120, y:  50 }, { x:  85, y:  35 }, { x:  50, y:  20 }, dropRight]
const globalRoutes     = [ topLeftSteps, topRightSteps, bottomLeftSteps, bottomRightSteps ]

export const EGG_COORDINATES = {
    GLOBAL_ROUTES: globalRoutes
}

export const EGG_VIRUSRED_RIGHT = {
    ID: 'EGG_VIRUSRED_RIGHT',
    MATERIAL: 'virus-red-right',
    SCALE_X: 650,
    SCALE_Y: 650,
    WEIGHT: -1
}

export const EGG_VIRUSRED_LEFT = {
    ...EGG_VIRUSRED_RIGHT,
    ID: 'EGG_VIRUSRED_LEFT',
    MATERIAL: 'virus-red-left'
}

export const EGG_VIRUS_RED = {
    ID: 'EGG_VIRUS_RED',
    SCALE_X: 650,
    SCALE_Y: 650,
    WEIGHT: -1,
    LEFT: {
        MATERIAL: 'virus-red-left'
    },
    RIGHT: {
        MATERIAL: 'virus-red-right'
    }
}

export const EGG_VIRUSBLUE_RIGHT = {
    ID: 'EGG_VIRUSBLUE_RIGHT',
    MATERIAL: 'virus-blue-right',
    SCALE_X: 650,
    SCALE_Y: 650,
    WEIGHT: -1
}

export const EGG_VIRUSBLUE_LEFT = {
    ...EGG_VIRUSBLUE_RIGHT,
    ID: 'EGG_VIRUSBLUE_LEFT',
    MATERIAL: 'virus-blue-left'
}

export const EGG_VIRUS_BLUE = {
    ID: 'EGG_VIRUS_BLUE',
    SCALE_X: 650,
    SCALE_Y: 650,
    WEIGHT: -1,
    LEFT: {
        MATERIAL: 'virus-blue-left'
    },
    RIGHT: {
        MATERIAL: 'virus-blue-right'
    }
}