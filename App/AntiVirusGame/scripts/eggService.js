import { findMe, randomInt, log } from './utils'
import { Egg } from './egg' 
import { EGG_VIRUSRED_RIGHT, EGG_VIRUSRED_LEFT, EGG_VIRUSBLUE_RIGHT, EGG_VIRUSBLUE_LEFT } from './eggConstants'

/*
 *  EGG SERVICE 
 */

let egg1 = null
let egg2 = null
let egg3 = null
let egg4 = null

let allowDrop = false

let eggRedVirusConfig = [ { objectConfig: EGG_VIRUSRED_LEFT }, { objectConfig: EGG_VIRUSRED_RIGHT } ]
let eggBlueVirusConfig = [ { objectConfig: EGG_VIRUSBLUE_LEFT }, { objectConfig: EGG_VIRUSBLUE_RIGHT } ]

const initEgg = (identifier) => {
    return new Promise((res, rej) => findMe(identifier).then(item => res(new Egg(identifier, item))))
}

const init = ({dropSettings}) => {
    allowDrop = dropSettings.allowDrop

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
        egg1.hide()
        egg2.hide()
        egg3.hide()
        egg4.hide()
        eggRedVirusConfig = [ { objectConfig: EGG_VIRUSRED_LEFT }, { objectConfig: EGG_VIRUSRED_RIGHT } ]
        eggBlueVirusConfig = [ { objectConfig: EGG_VIRUSBLUE_LEFT }, { objectConfig: EGG_VIRUSBLUE_RIGHT } ]
    })
}

// return -1 if dropped on the left, 1 if dropped on the right, 0 if no virus dropped
const tick = (gameSpeed, eggDroppedCallback) => {
    const position = randomInt(1, 4) - 1
    const redBlueSelector = randomInt(1, 2) - 1
    const speed = Math.max(gameSpeed / 2, 350)

    egg1.step(speed)
    egg2.step(speed)
    egg3.step(speed)
    egg4.step(speed)

    const config = redBlueSelector == 0 ? eggRedVirusConfig[position % 2] : eggBlueVirusConfig[position % 2]

    const startConfig = {
        position,
        allowDrop,
        eggDroppedCallback,
        ...config,
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