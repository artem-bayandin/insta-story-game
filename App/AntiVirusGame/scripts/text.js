import { createTextScore, createTextTimer, createBase, createWithMove } from './inheritance'
import { log } from './utils'

/*
 *  TEXT ENTITIES 
 */

export const TxtScore = (id, obj) => {
    const object = {
        ...createBase(id, obj),
        ...createTextScore(obj),
        ...createWithMove(obj)
    }
    object.clearText()
    return object
}

export const TxtTimer = (id, obj) => {
    const object = {
        ...createBase(id, obj),
        ...createTextTimer(obj),
    }
    object.clearText()
    return object
}