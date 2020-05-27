import { findMe, log, randomItem } from './utils'
import { Egg } from './egg' 
import { EGG_COORDINATES } from './eggConstants'
import { SIDE } from './commonConstants'

/*
 *  EGG SERVICE 
 */

let egg1 = null
let egg2 = null
let egg3 = null
let egg4 = null

let gMode = null

let eggs = []

const initEgg = (identifier) => {
    return new Promise((res, rej) => findMe(identifier).then(item => res(new Egg(identifier, item))))
}

const init = ({eggServiceOptions, gameMode}) => {
    gMode = gameMode
    const inputEggs = eggServiceOptions.eggProbabilityArray
    if (inputEggs && inputEggs.length) {
        eggs.length = 0
        inputEggs.forEach(item => {
            const [ inputType, inputNumber ] = item
            for (var i = 0; i < inputNumber; i++) {
                eggs.push(inputType)
            }
        });
    }

    var promise1 = new Promise((res, rej) => initEgg('egg1').then(obj => res(egg1 = obj)))
    var promise2 = new Promise((res, rej) => initEgg('egg2').then(obj => res(egg2 = obj)))
    var promise3 = new Promise((res, rej) => initEgg('egg3').then(obj => res(egg3 = obj)))
    var promise4 = new Promise((res, rej) => initEgg('egg4').then(obj => res(egg4 = obj)))

    return Promise.all([
        promise1
        , promise2
        , promise3
        , promise4
    ]).then(() => {
        egg1.hide({})
        egg2.hide()
        egg3.hide()
        egg4.hide()
    })
}

// return -1 if dropped on the left, 1 if dropped on the right, 0 if no virus dropped
const tick = (gameSpeed, eggCallback) => {
    const speed = Math.max(gameSpeed / 2, 350)

    egg1.step(speed)
    egg2.step(speed)
    egg3.step(speed)
    egg4.step(speed)

    const { linePoints, side } = randomItem(EGG_COORDINATES.GLOBAL_ROUTES)
    const config = randomItem(eggs)

    const startConfig = {
        route: linePoints,
        gameMode: gMode,
        eggCallback,
        objectConfig: config,
        newMaterial: side === SIDE.LEFT ? config.MATERIAL.LEFT : config.MATERIAL.RIGHT,
    }

    if (!egg1.isVisible()) {
        egg1.start(startConfig)
    } else if (!egg2.isVisible()) {
        egg2.start(startConfig)
    } else if (!egg3.isVisible()) {
        egg3.start(startConfig)
    } else if (!egg4.isVisible()) {
        egg4.start(startConfig)
    }
}

const eggService = {
    init,
    tick
} 

export default eggService