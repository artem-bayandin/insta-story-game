import { OBJECT_ID, MATERIALS } from './commonConstants'

/*
 *  PLAYER CONSTANTS
 */

const X_DEFAULT = 45
const X_LEFT = -X_DEFAULT
const X_RIGHT = X_DEFAULT
const Y_TOP = 160
const Y_BOTTOM = 0
const Y_DEFAULT = 0
const Y_ONLY_X = -130
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
    PLAYER_OBJECT_ID: OBJECT_ID.PLAYER,
    MATERIAL: MATERIALS.TRACTOR,
    SCALE_X: 1200,
    SCALE_Y: 950,
    POSITION_DETECTOR: {
        LEFT:   -40,
        RIGHT:  40,
        TOP:    100,
        BOTTOM: 60
    }
}

export const PLAYER_FACE = {
    ID: 'PLAYER_FACE',
    PLAYER_OBJECT_ID: OBJECT_ID.PLAYER,
    MATERIAL: MATERIALS.FACE_WITH_MASK,
    SCALE_X: 900,
    SCALE_Y: 950,
    POSITION_DETECTOR: {
        LEFT:   -40,
        RIGHT:  40,
        TOP:    100,
        BOTTOM: 60
    }
}