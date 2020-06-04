 import { MATERIALS } from './materials'

/*
 *  PLAYER CONSTANTS
 */

const X_DEFAULT = 45
const X_LEFT = -X_DEFAULT
const X_RIGHT = X_DEFAULT
const Y_TOP = 160
const Y_BOTTOM = 0
const Y_DEFAULT = 0
const Y_ONLY_X = -132
const TRANSITION_SPEED = 175

export const PLAYER_POSITION_DEFAULTS = {
    X_LEFT,
    X_RIGHT,
    X_DEFAULT,
    Y_TOP,
    Y_BOTTOM,
    Y_DEFAULT,
    Y_ONLY_X,
    TRANSITION_SPEED
}

export const PLAYER_POSITION_DETECTOR = {
    LEFT:   -15,
    RIGHT:  15,
    TOP:    100,
    BOTTOM: 60
}

export const PLAYER_TRACTOR = {
    ID: 'PLAYER_TRACTOR',
    MATERIAL: MATERIALS.TRACTOR,
    SCALE_X: 1200,
    SCALE_Y: 950
}

export const PLAYER_FACE = {
    ID: 'PLAYER_FACE',
    MATERIAL: MATERIALS.FACE_WITH_MASK,
    SCALE_X: 900,
    SCALE_Y: 950
}

export const PLAYER_MUSTACHE = {
    ID: 'PLAYER_MUSTACHE',
    MATERIAL: MATERIALS.MUSTACHE,
    SCALE_X: 1000,
    SCALE_Y: 800
}

export const PLAYER_A4 = {
    ID: 'PLAYER_A4',
    MATERIAL: MATERIALS.A4,
    SCALE_X: 800,
    SCALE_Y: 950
}