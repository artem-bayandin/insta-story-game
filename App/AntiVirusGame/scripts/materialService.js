import { log, findMaterial } from './utils'
import { MATERIALS } from './commonConstants'

let materials = {}

const init = ({}) => {
    // materials for eggs
    var promise1 = new Promise((res, rej) => findMaterial(MATERIALS.VIRUS_RED_LEFT).then(mat => res(materials[MATERIALS.VIRUS_RED_LEFT] = mat) ) )
    var promise2 = new Promise((res, rej) => findMaterial(MATERIALS.VIRUS_RED_RIGHT).then(mat => res(materials[MATERIALS.VIRUS_RED_RIGHT] = mat) ) )
    var promise3 = new Promise((res, rej) => findMaterial(MATERIALS.VIRUS_BLUE_LEFT).then(mat => res(materials[MATERIALS.VIRUS_BLUE_LEFT] = mat) ) )
    var promise4 = new Promise((res, rej) => findMaterial(MATERIALS.VIRUS_BLUE_RIGHT).then(mat => res(materials[MATERIALS.VIRUS_BLUE_RIGHT] = mat) ) )
    // materials for player
    var promise5 = new Promise((res, rej) => findMaterial(MATERIALS.FACE_WITH_MASK).then(mat => res(materials[MATERIALS.FACE_WITH_MASK] = mat) ) )
    var promise6 = new Promise((res, rej) => findMaterial(MATERIALS.TRACTOR).then(mat => res(materials[MATERIALS.TRACTOR] = mat) ) )
    // green mask material
    var promise5 = new Promise((res, rej) => findMaterial(MATERIALS.MASK_GREEN).then(mat => res(materials[MATERIALS.MASK_GREEN] = mat) ) )

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