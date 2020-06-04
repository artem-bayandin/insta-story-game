import { createTextScore, createBase, createWithMove } from './inheritance'
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
    return object
}