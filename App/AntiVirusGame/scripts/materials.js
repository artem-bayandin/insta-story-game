import { log, findMaterial } from './utils'

export const MATERIALS = {
    VIRUS_RED_LEFT: 'virus-red-left',
    VIRUS_RED_RIGHT: 'virus-red-right',
    VIRUS_BLUE_LEFT: 'virus-blue-left',
    VIRUS_BLUE_RIGHT: 'virus-blue-right',
    MASK_GREEN: 'mask-green',
    TRACTOR: 'belarus-1',
    FACE_WITH_MASK: 'face-2',
    STOPWATCH: 'stopwatch-1',
    LEVEL: 'speed-1',
    LINE_DEFAULT: 'line-grad',
    STATS_LINE_BG: 'statsLineMaterial',
    LINE_GRAD: 'line-grad',
    MUSTACHE: 'mustache',
    A4: 'a4',
    POTATO_LEFT: 'potato-left',
    POTATO_RIGHT: 'potato-right',
    DOLLAR: 'dollar',
    FIRE: 'fire',
    PAPER_LEFT: 'paper-left',
    PAPER_RIGHT: 'paper-right',
    RICK: 'rick',
    MORTY: 'morty',
    SUN_LEFT: 'sun-left',
    SUN_RIGHT: 'sun-right',
    CUCU_LEFT: 'cucu-left',
    CUCU_RIGHT: 'cucu-right',
    PINK_LEFT: 'pink-left',
    PINK_RIGHT: 'pink-right'
}

let array = {}

const init = () => {
    const promises = Object.keys(MATERIALS).map(id => {
        try {
            findMaterial(MATERIALS[id]).then(mat => array[MATERIALS[id]] = mat)
        } catch (err) {
            log(`[materials] init for '${id}' failed`)
        }
    })
    return Promise.all(promises).then(() => log(`[materials] initialized`))
}

const get = (id) => {
    try {
        return array[id]
    } catch (err) {
        log(`[materials] get for '${id}' failed`)
    }
}

const materials = {
    init,
    get
} 

export default materials