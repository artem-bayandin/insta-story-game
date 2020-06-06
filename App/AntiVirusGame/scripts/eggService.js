import { log, randomInt } from './utils'
import { Egg } from './egg' 
import { EGG_COORDINATES } from './eggConstants'
import { SIDE } from './commonConstants'

import objects, { OBJECTS } from './objects'

/*
 *  EGG SERVICE 
 */

let egg1 = null
let egg2 = null
let egg3 = null
let egg4 = null

let gMode = null

let eggs = []

let currentEggIndex = 0
const randomizedEggsCount = 97
let randomizedEggsIndeces = []

let currentRouteIndex = 0
const randomizedRoutes = 113
let randomizedRoutesIndeces = []

const init = ({ eggOptions, gameMode }) => {
    updateSettings({ eggOptions, gameMode })

    egg1 = new Egg(OBJECTS.EGG1, objects.get(OBJECTS.EGG1))
    egg2 = new Egg(OBJECTS.EGG2, objects.get(OBJECTS.EGG2))
    egg3 = new Egg(OBJECTS.EGG3, objects.get(OBJECTS.EGG3))
    egg4 = new Egg(OBJECTS.EGG4, objects.get(OBJECTS.EGG4))
    
    hideAll()

    log(`[eggService] initialized`)
}

const updateSettings = ({ eggOptions, gameMode }) => {
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
    randomizedEggsIndeces.length = 0
    let eggLength = eggs.length
    for (let i = 0; i < randomizedEggsCount; i++) {
        randomizedEggsIndeces.push(randomInt(1, eggLength) - 1)
    }

    // fill randomizedRoutes with indeces 0..4 for routes collection
    randomizedRoutesIndeces.length = 0
    for (let i = 0; i < randomizedRoutes; i++) {
        randomizedRoutesIndeces.push(randomInt(1, 4) - 1)
    }

    // log(`[eggService] settings updated`)
}

let currentGameSpeed = 0
let halfSpeed = 0 // speed / 2
let quaterSpeed = 0 // speed / 4                               // max gameSpeed = 333
let innerSpeed = 0 // halfSpeed < 200 ? 200 : halfSpeed        // speed = gameSpeed, so max innerSpeed = 200
let dropSpeed = 0 // quaterSpeed < 100 ? 100 : quaterSpeed     // max dropSpeed = 100

const getNextEgg = () => {
    currentEggIndex++
    if (currentEggIndex >= randomizedEggsCount) currentEggIndex = 0
    return eggs[randomizedEggsIndeces[currentEggIndex]]
}

const getNextRoute = () => {
    currentRouteIndex++
    if (currentRouteIndex >= randomizedRoutes) currentRouteIndex = 0
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
    hideAll,
    updateSettings
} 

export default eggService