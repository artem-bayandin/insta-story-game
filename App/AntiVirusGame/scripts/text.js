import { createTextScore, createTextTimer } from './inheritance'

/*
 *  TEXT ENTITIES 
 */

export const TxtScore = (id, obj) => {
    const object = {
        ...createTextScore(obj)
    }
    object.clearText()
    return object
}

export const TxtTimer = (id, obj) => {
    const object = {
        ...createTextTimer(obj)
    }
    object.clearText()
    return object
}