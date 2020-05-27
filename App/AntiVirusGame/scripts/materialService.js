import { log, findMaterial } from './utils'
import { EGG_VIRUS_RED, EGG_VIRUS_BLUE, EGG_MASK_GREEN } from './eggConstants'
import { PLAYER_FACE, PLAYER_TRACTOR } from './playerConstants'

let materials = {}

const init = ({}) => {
    // materials for eggs
    var promise1 = new Promise((res, rej) => findMaterial(EGG_VIRUS_RED().MATERIAL.LEFT).then(mat => res(materials[EGG_VIRUS_RED().MATERIAL.LEFT] = mat) ) )
    var promise2 = new Promise((res, rej) => findMaterial(EGG_VIRUS_RED().MATERIAL.RIGHT).then(mat => res(materials[EGG_VIRUS_RED().MATERIAL.RIGHT] = mat) ) )
    var promise3 = new Promise((res, rej) => findMaterial(EGG_VIRUS_BLUE().MATERIAL.LEFT).then(mat => res(materials[EGG_VIRUS_BLUE().MATERIAL.LEFT] = mat) ) )
    var promise4 = new Promise((res, rej) => findMaterial(EGG_VIRUS_BLUE().MATERIAL.RIGHT).then(mat => res(materials[EGG_VIRUS_BLUE().MATERIAL.RIGHT] = mat) ) )
    // materials for player
    var promise5 = new Promise((res, rej) => findMaterial(PLAYER_FACE.MATERIAL).then(mat => res(materials[PLAYER_FACE.MATERIAL] = mat) ) )
    var promise6 = new Promise((res, rej) => findMaterial(PLAYER_TRACTOR.MATERIAL).then(mat => res(materials[PLAYER_TRACTOR.MATERIAL] = mat) ) )
    // green mask material
    var promise5 = new Promise((res, rej) => findMaterial(EGG_MASK_GREEN().MATERIAL.RIGHT).then(mat => res(materials[EGG_MASK_GREEN().MATERIAL.RIGHT] = mat) ) )

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