import { log, findMaterial } from './utils'
import { MATERIALS } from './commonConstants'

let materials = {}

const initMaterial = (id) => {
    return new Promise((res, rej) => findMaterial(id).then(mat => res(materials[id] = mat)))
}

const init = () => {
    // materials for eggs
    var promise1 = initMaterial(MATERIALS.VIRUS_RED_LEFT)
    var promise2 = initMaterial(MATERIALS.VIRUS_RED_RIGHT)
    var promise3 = initMaterial(MATERIALS.VIRUS_BLUE_LEFT)
    var promise4 = initMaterial(MATERIALS.VIRUS_BLUE_RIGHT)
    // green mask material
    var promise7 = initMaterial(MATERIALS.MASK_GREEN)
    // materials for player
    var promise6 = initMaterial(MATERIALS.TRACTOR)
    var promise5 = initMaterial(MATERIALS.FACE_WITH_MASK)
    // other
    var promise8 = initMaterial(MATERIALS.STOPWATCH)
    var promise9 = initMaterial(MATERIALS.LEVEL)
    var promise10 = initMaterial(MATERIALS.LINE_DEFAULT)
    var promise11 = initMaterial(MATERIALS.STATS_LINE_BG)
    var promise12 = initMaterial(MATERIALS.LINE_GRAD)
    // new players and eggs
    var promise12 = initMaterial(MATERIALS.MUSHROOMS)
    var promise12 = initMaterial(MATERIALS.A4)
    var promise12 = initMaterial(MATERIALS.POTATO_LEFT)
    var promise12 = initMaterial(MATERIALS.POTATO_RIGHT)
    var promise12 = initMaterial(MATERIALS.DOLLAR)
    var promise12 = initMaterial(MATERIALS.FIRE)
    var promise12 = initMaterial(MATERIALS.POTATO_LEFT)
    var promise12 = initMaterial(MATERIALS.POTATO_RIGHT)

    return Promise.all([
        promise1
        , promise2
        , promise3
        , promise4
        , promise5
        , promise6
        , promise7
        , promise8
        , promise9
        , promise10
        , promise11
        , promise12
    ])
}

const get = (name) => materials[name]

const materialService = {
    init,
    get
} 

export default materialService