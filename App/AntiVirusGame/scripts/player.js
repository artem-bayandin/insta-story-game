import { createWithId, createWithCoordinates } from './inheritance'

/*
 *  PLAYER ENTITY
 */

export const Player = (id, obj) => {
    return {
        ...createWithId(id),
        ...createWithCoordinates(obj)
    }
}