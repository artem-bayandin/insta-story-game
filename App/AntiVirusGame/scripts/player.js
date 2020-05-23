import { createWithId, createWithCoordinates } from './inheritance'

export const PLAYER_MATERIAL_TRACTOR = 'PLAYER_MATERIAL_TRACTOR'
export const PLAYER_MATERIAL_FACE = 'PLAYER_MATERIAL_FACE'

/*
 *  PLAYER ENTITY
 *  refactor it 
 */

export const Player = (id, obj) => {
    return {
        ...createWithCoordinates(obj),
        ...createWithId(id)
    }
}