import { createWithId, createWithCoordinates } from './inheritance'

/*
 *  PLAYER CONSTANTS
 */

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

/*
 *  PLAYER ENTITY
 */

export const Player = (id, obj) => {
    return {
        ...createWithCoordinates(obj),
        ...createWithId(id)
    }
}