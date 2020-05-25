import { createTextScore, createTextTimer, createBase } from './inheritance'

/*
 *  TEXT ENTITIES 
 */

export const TxtScore = (id, obj) => {
    const object = {
        ...createBase(id, obj),
        ...createTextScore(obj)
    }
    object.clearText()
    return object
}

export const TxtTimer = (id, obj) => {
    const object = {
        ...createBase(id, obj),
        ...createTextTimer(obj)
    }
    object.clearText()
    return object
}