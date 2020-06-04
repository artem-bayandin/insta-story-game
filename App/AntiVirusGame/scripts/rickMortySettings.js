import { POSITION_DETECTOR } from './playerConstants'
import { MATERIALS } from './materials'
import { OBJECTS } from './objects'
import { log } from './utils'

/* 
 * PLAYERS
 */

export const PLAYER_RICK = {
    ID: 'PLAYER_RICK',
    PLAYER_OBJECT_ID: OBJECTS.PLAYER,
    MATERIAL: MATERIALS.RICK,
    SCALE_X: 950,
    SCALE_Y: 950,
    POSITION_DETECTOR
}

export const PLAYER_MORTY = {
    ID: 'PLAYER_MORTY',
    PLAYER_OBJECT_ID: OBJECTS.PLAYER,
    MATERIAL: MATERIALS.MORTY,
    SCALE_X: 850,
    SCALE_Y: 850,
    POSITION_DETECTOR
}

/*
 * EGGS
 */

export const EGG_RICK = (weight = 0) => { // HEALER
    return {
        ID: 'EGG_RICK',
        SCALE_X: 640,
        SCALE_Y: 640,
        WEIGHT: weight,
        MATERIAL: {
            LEFT: MATERIALS.RICK,
            RIGHT: MATERIALS.RICK
        },
        STAT_ICON: {
            SCALE_X: 400,
            SCALE_Y: 400,
            MATERIAL: MATERIALS.RICK
        },
        AC_ICON: {
            SCALE_X: 350,
            SCALE_Y: 350,
        }
    }
}

export const EGG_MORTY = (weight = 0) => { // HEALER
    return {
        ID: 'EGG_MORTY',
        SCALE_X: 560,
        SCALE_Y: 560,
        WEIGHT: weight,
        MATERIAL: {
            LEFT: MATERIALS.MORTY,
            RIGHT: MATERIALS.MORTY
        },
        STAT_ICON: {
            SCALE_X: 350,
            SCALE_Y: 350,
            MATERIAL: MATERIALS.MORTY
        },
        AC_ICON: {
            SCALE_X: 300,
            SCALE_Y: 300,
        }
    }
}

export const EGG_SUN = (weight = 0) => { // KILLER 
    return {
        ID: 'EGG_SUN',
        SCALE_X: 640,
        SCALE_Y: 640,
        WEIGHT: weight,
        MATERIAL: {
            LEFT: MATERIALS.SUN_LEFT,
            RIGHT: MATERIALS.SUN_RIGHT
        },
        STAT_ICON: {
            SCALE_X: 400,
            SCALE_Y: 400,
            MATERIAL: MATERIALS.SUN_LEFT
        },
        AC_ICON: {
            SCALE_X: 350,
            SCALE_Y: 350,
        }
    }
}

export const EGG_CUCU = (weight = 0) => { // KILLER
    return {
        ID: 'EGG_CUCU',
        SCALE_X: 640,
        SCALE_Y: 640,
        WEIGHT: weight,
        MATERIAL: {
            LEFT: MATERIALS.CUCU_LEFT,
            RIGHT: MATERIALS.CUCU_RIGHT
        },
        STAT_ICON: {
            SCALE_X: 400,
            SCALE_Y: 400,
            MATERIAL: MATERIALS.CUCU_LEFT
        },
        AC_ICON: {
            SCALE_X: 350,
            SCALE_Y: 350,
        }
    }
}

export const EGG_PINK = (weight = 0) => { // KILLER
    return {
        ID: 'EGG_PINK',
        SCALE_X: 640,
        SCALE_Y: 640,
        WEIGHT: weight,
        MATERIAL: {
            LEFT: MATERIALS.PINK_LEFT,
            RIGHT: MATERIALS.PINK_RIGHT
        },
        STAT_ICON: {
            SCALE_X: 400,
            SCALE_Y: 400,
            MATERIAL: MATERIALS.PINK_LEFT
        },
        AC_ICON: {
            SCALE_X: 350,
            SCALE_Y: 350,
        }
    }
}