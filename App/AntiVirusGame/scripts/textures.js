import { log, findTexture } from './utils'

export const TEXTURES = {
    FACE_WITH_MASK: 'face-2',
    MASK_GREEN: 'mask-1',
    LEVEL: 'speed-1',
    STOPWATCH: 'stopwatch-2',
    TRACTOR: 'belarus-01-rotated',
    VIRUS_BLUE_LEFT: 'virus-blue-left-256px',
    VIRUS_RED_LEFT: 'virus-red-left-256px',
    VIRUS_BLUE_RIGHT: 'virus-blue-right-256px',
    VIRUS_RED_RIGHT: 'virus-red-right-256px',
    LINE_GRAD_LIGHT: 'line-grad-light',
    TURN_YOUR_HEAD: 'turn-your-head',
    ROAD: 'road-1024x64',
    MUSTACHE: 'mush-8x7',
    A4: 'bumaga-6x8',
    POTATO_LEFT: 'potato-7x8-left',
    POTATO_RIGHT: 'potato-7x8-right',
    DOLLAR: 'dollar-11x16',
    FIRE: 'fire-6x8',
    PAPER_LEFT: 'paper-7x8-left',
    PAPER_RIGHT: 'paper-7x8-right',
    RICK: 'rick-256',
    MORTY: 'morty-256',
    SUN_LEFT: 'sun-256-left',
    SUN_RIGHT: 'sun-256-right',
    CUCU_LEFT: 'cucu-256-left',
    CUCU_RIGHT: 'cucu-256-right',
    PINK_LEFT: 'pink-256-left',
    PINK_RIGHT: 'pink-256-right'
}

let array = {}

const init = () => {
    const promises = Object.keys(TEXTURES).map(id => {
        try {
            return findTexture(TEXTURES[id]).then(obj => array[TEXTURES[id]] = obj)
        } catch (err) {
            log(`[textures] init for '${id}' failed`)
        }
    })
    return Promise.all(promises).then(() => log(`[textures] initialized`))
}

const get = (id) => {
    try {
        return array[id]
    } catch (err) {
        log(`[textures] get for '${id}' failed`)
    }
}

const textures = {
    init,
    get
} 

export default textures