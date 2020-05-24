import { createWithId, createWithCoordinates } from './inheritance'

/*
 *  PLAYER ENTITY
 */

export const Player = (id, obj) => {
    return {
        ...createWithCoordinates(obj),
        ...createWithId(id)
    }
}