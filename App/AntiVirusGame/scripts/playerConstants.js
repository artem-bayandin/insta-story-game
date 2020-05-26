/*
 *  PLAYER CONSTANTS
 */

const X_LEFT = -50
const X_RIGHT = 50
const X_DEFAULT = 0
const Y_TOP = 170
const Y_BOTTOM = 20
const Y_DEFAULT = 20
const Y_ONLY_X = -170
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

export const PLAYER_TRACTOR = {
    ID: 'PLAYER_TRACTOR',
    MATERIAL: 'belarus-1',
    SCALE_X: 1000,
    SCALE_Y: 780,
    POSITION_DETECTOR: {
        LEFT:   -40,
        RIGHT:  40,
        TOP:    0,
        BOTTOM: 0
    }
}

export const PLAYER_FACE = {
    ID: 'PLAYER_FACE',
    MATERIAL: 'face-2',
    SCALE_X: 700,
    SCALE_Y: 750,
    POSITION_DETECTOR: {
        LEFT:   -40,
        RIGHT:  40,
        TOP:    0,
        BOTTOM: 0
    }
}