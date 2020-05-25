import { createBase } from './inheritance'

/*
 *  PLAYER ENTITY
 */

export const Player = (id, obj) => {
    return {
        ...createBase(id, obj)
    }
}