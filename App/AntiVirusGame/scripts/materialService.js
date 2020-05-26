import { log, findMaterial } from './utils'
import { EGG_VIRUSRED_RIGHT, EGG_VIRUSRED_LEFT, EGG_VIRUSBLUE_RIGHT, EGG_VIRUSBLUE_LEFT } from './eggConstants'
import { PLAYER_FACE, PLAYER_TRACTOR } from './playerConstants'

let materials = {}

const init = ({}) => {
    // materials for eggs
    var promise1 = new Promise((res, rej) => findMaterial(EGG_VIRUSRED_RIGHT.MATERIAL).then(mat => res(materials[EGG_VIRUSRED_RIGHT.MATERIAL] = mat) ) )
    var promise2 = new Promise((res, rej) => findMaterial(EGG_VIRUSRED_LEFT.MATERIAL).then(mat => res(materials[EGG_VIRUSRED_LEFT.MATERIAL] = mat) ) )
    var promise3 = new Promise((res, rej) => findMaterial(EGG_VIRUSBLUE_RIGHT.MATERIAL).then(mat => res(materials[EGG_VIRUSBLUE_RIGHT.MATERIAL] = mat) ) )
    var promise4 = new Promise((res, rej) => findMaterial(EGG_VIRUSBLUE_LEFT.MATERIAL).then(mat => res(materials[EGG_VIRUSBLUE_LEFT.MATERIAL] = mat) ) )
    // materials for player
    var promise5 = new Promise((res, rej) => findMaterial(PLAYER_FACE.MATERIAL).then(mat => res(materials[PLAYER_FACE.MATERIAL] = mat) ) )
    var promise6 = new Promise((res, rej) => findMaterial(PLAYER_TRACTOR.MATERIAL).then(mat => res(materials[PLAYER_TRACTOR.MATERIAL] = mat) ) )

    return Promise.all([
        promise1
        , promise2
        , promise3
        , promise4
        , promise5
        , promise6
    ])
}

const get = (name) => materials[name]

const materialService = {
    init,
    get
} 

export default materialService