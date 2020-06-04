import { log, findMe } from './utils'

export const OBJECTS = {
    PLAYER: 'player',

    EGG1: 'egg1',
    EGG2: 'egg2',
    EGG3: 'egg3',
    EGG4: 'egg4',

    GAMEPAD_LEFT_TOP: 'btn-left-top',           // currently removed buttons from UI
    GAMEPAD_RIGHT_TOP: 'btn-right-top',
    GAMEPAD_LEFT_BOTTOM: 'btn-left-bottom',
    GAMEPAD_RIGHT_BOTTOM: 'btn-right-bottom',
    GAMEPAD_PAUSE: 'btn-pause',

    TXT_LEVEL: 'txtLevel',
    TXT_EGGS: 'txtEggs',
    TXT_LIVES: 'txtLives',
    TXT_TIMER: 'txtTimer',
    TXT_INTERACTION: 'txtInteraction',

    ICON_STOPWATCH: 'timerStatIcon',
    ICON_LEVEL: 'levelStatIcon',
    ICON_EGG: 'eggStatIcon',
    ICON_LIVES: 'livesStatIcon',
    ICON_STATS_LINE_BG: 'statsLineBackground',

    LINE_LEFT_TOP: 'left-top',
    LINE_RIGHT_TOP: 'right-top',
    LINE_LEFT_BOTTOM: 'left-bottom',
    LINE_RIGHT_BOTTOM: 'right-bottom',
}

let array = {}

const init = () => {
    const promises = Object.keys(OBJECTS).map(id => {
        try {
            findMe(OBJECTS[id]).then(obj => array[OBJECTS[id]] = obj)
        } catch (err) {
            log(`[objects] init for '${id}' failed`)
        }
    })
    return Promise.all(promises).then(() => log(`[objects] initialized`))
}

const get = (id) => {
    try {
        return array[id]
    } catch (err) {
        log(`[objects] get for '${id}' failed`)
    }
}

const objects = {
    init,
    get
} 

export default objects