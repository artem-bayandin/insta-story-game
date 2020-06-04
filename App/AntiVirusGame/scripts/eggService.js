import { findMe, log, randomItem, randomInt } from './utils'
import { Egg } from './egg' 
import { EGG_COORDINATES } from './eggConstants'
import { SIDE } from './commonConstants'

import { OBJECTS } from './objects'

/*
 *  EGG SERVICE 
 */

let egg1 = null
let egg2 = null
let egg3 = null
let egg4 = null

let gMode = null

let eggs = []

let randomizedItemsCount = 100
let currentEggIndex = 0
let randomizedEggsIndeces = []
let currentRouteIndex = 0
let randomizedRoutesIndeces = []

const initEgg = (identifier) => {
    return new Promise((res, rej) => findMe(identifier).then(item => res(new Egg(identifier, item))))
}

const init = ({ eggOptions, gameMode }) => {
    gMode = gameMode
    const inputEggs = eggOptions.probability
    if (inputEggs && inputEggs.length) {
        eggs.length = 0
        inputEggs.forEach(item => {
            const [ inputType, inputNumber ] = item
            for (var i = 0; i < inputNumber; i++) {
                eggs.push(inputType)
            }
        });
    }

    // fill randomizedEggs with indeces 0..eggs.length
    let eggLength = eggs.length
    for (let i = 0; i < randomizedItemsCount; i++) {
        randomizedEggsIndeces.push(randomInt(1, eggLength) - 1)
    }

    // fill randomizedRoutes with indeces 0..4 for routes collection
    for (let i = 0; i < randomizedItemsCount; i++) {
        randomizedRoutesIndeces.push(randomInt(1, 4) - 1)
    }

    const promise1 = new Promise((res, rej) => initEgg(OBJECTS.EGG1).then(obj => res(egg1 = obj)))
    const promise2 = new Promise((res, rej) => initEgg(OBJECTS.EGG2).then(obj => res(egg2 = obj)))
    const promise3 = new Promise((res, rej) => initEgg(OBJECTS.EGG3).then(obj => res(egg3 = obj)))
    const promise4 = new Promise((res, rej) => initEgg(OBJECTS.EGG4).then(obj => res(egg4 = obj)))
    return Promise.all([
        promise1
        , promise2
        , promise3
        , promise4
    ]).then(() => {
        egg1.hide()
        egg2.hide()
        egg3.hide()
        egg4.hide()
    }).then(() => log(`[eggService] initialized`))
}

// return -1 if dropped on the left, 1 if dropped on the right, 0 if no virus dropped

let currentGameSpeed = 0
let halfSpeed = 0 // speed / 2
let quaterSpeed = 0 // speed / 4                               // max gameSpeed = 333
let innerSpeed = 0 // halfSpeed < 200 ? 200 : halfSpeed        // speed = gameSpeed, so max innerSpeed = 200
let dropSpeed = 0 // quaterSpeed < 100 ? 100 : quaterSpeed     // max dropSpeed = 100

const getNextEgg = () => {
    currentEggIndex++
    if (currentEggIndex >= randomizedItemsCount) currentEggIndex = 0
    return eggs[randomizedEggsIndeces[currentEggIndex]]
}

const getNextRoute = () => {
    currentRouteIndex++
    if (currentRouteIndex >= randomizedItemsCount) currentRouteIndex = 0
    return EGG_COORDINATES.GLOBAL_ROUTES[randomizedRoutesIndeces[currentRouteIndex]]
}

const startEgg = (egg, eggCallback) => {
    const { linePoints, sides } = getNextRoute()
    const config = getNextEgg()

    const startConfig = {
        route: linePoints,
        sides,
        gameMode: gMode,
        eggCallback,
        objectConfig: config,
        newMaterial: sides.x === SIDE.LEFT ? config.MATERIAL.LEFT : config.MATERIAL.RIGHT,
    }

    egg.start(startConfig)
}

const tick = (gameSpeed, eggCallback) => {

    if (gameSpeed !== currentGameSpeed) {
        currentGameSpeed = gameSpeed
        halfSpeed = currentGameSpeed / 2
        quaterSpeed = currentGameSpeed / 4                    // max gameSpeed = 333
        innerSpeed = halfSpeed < 200 ? 200 : halfSpeed        // speed = gameSpeed, so max innerSpeed = 200
        dropSpeed = quaterSpeed < 100 ? 100 : quaterSpeed     // max dropSpeed = 100
    }

    egg1.step(innerSpeed, dropSpeed)
    egg2.step(innerSpeed, dropSpeed)
    egg3.step(innerSpeed, dropSpeed)
    egg4.step(innerSpeed, dropSpeed)

    if (!egg1.isVisible()) {
        startEgg(egg1, eggCallback)
    } else if (!egg2.isVisible()) {
        startEgg(egg2, eggCallback)
    } else if (!egg3.isVisible()) {
        startEgg(egg3, eggCallback)
    } else if (!egg4.isVisible()) {
        startEgg(egg4, eggCallback)
    }
}

const hideAll = () => {
    egg1.hide()
    egg2.hide()
    egg3.hide()
    egg4.hide()
}

const eggService = {
    init,
    tick,
    hideAll
} 

export default eggService