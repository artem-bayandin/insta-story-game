import { findMe, findMaterial, randomInt, log } from './utils'
import { Egg } from './egg' 
import { EGG_VIRUSRED_RIGHT, EGG_VIRUSRED_LEFT, EGG_VIRUSBLUE_RIGHT, EGG_VIRUSBLUE_LEFT } from './eggConstants'

/*
 *  EGG SERVICE 
 */

let egg1 = null
let egg2 = null
let egg3 = null
let egg4 = null

let matEggVirusRedRight = null
let matEggVirusRedLeft = null
let matEggVirusBlueRight = null
let matEggVirusBlueLeft = null

let eggRedVirusConfig = [ { objectConfig: EGG_VIRUSRED_LEFT, material: matEggVirusRedLeft }, { objectConfig: EGG_VIRUSRED_RIGHT, material: matEggVirusRedRight } ]
let eggBlueVirusConfig = [ { objectConfig: EGG_VIRUSBLUE_LEFT, material: matEggVirusBlueLeft }, { objectConfig: EGG_VIRUSBLUE_RIGHT, material: matEggVirusBlueRight } ]

const initEgg = (identifier) => {
    return new Promise((res, rej) => {
        findMe(identifier).then(item => {
            const egg = new Egg(identifier, item)
            res(egg)
        })
    })
}

const init = () => {
    var promise1 = new Promise((res, rej) => {
            initEgg('egg1').then(obj => {
                egg1 = obj
                res(egg1)
            })
        })
    var promise2 = new Promise((res, rej) => {
            initEgg('egg2').then(obj => {
                egg2 = obj
                res(egg2)
            })
        })
    var promise3 = new Promise((res, rej) => {
            initEgg('egg3').then(obj => {
                egg3 = obj
                res(egg3)
            })
        })
    var promise4 = new Promise((res, rej) => {
            initEgg('egg4').then(obj => {
                egg4 = obj
                res(egg4)
            })
        })
    var matEggVirusRedRightPromise = new Promise((res, rej) => {
        findMaterial(EGG_VIRUSRED_RIGHT.MATERIAL).then(mat => {
            matEggVirusRedRight = mat
            res(matEggVirusRedRight)
        })
    })
    var matEggVirusRedLeftPromise = new Promise((res, rej) => {
        findMaterial(EGG_VIRUSRED_LEFT.MATERIAL).then(mat => {
            matEggVirusRedLeft = mat
            res(matEggVirusRedLeft)
        })
    })
    var matEggVirusBlueRightPromise = new Promise((res, rej) => {
        findMaterial(EGG_VIRUSBLUE_RIGHT.MATERIAL).then(mat => {
            matEggVirusBlueRight = mat
            res(matEggVirusBlueRight)
        })
    })
    var matEggVirusBlueLeftPromise = new Promise((res, rej) => {
        findMaterial(EGG_VIRUSBLUE_LEFT.MATERIAL).then(mat => {
            matEggVirusBlueLeft = mat
            res(matEggVirusBlueLeft)
        })
    })

    return Promise.all([promise1, promise2, promise3, promise4
        , matEggVirusRedRightPromise, matEggVirusRedLeftPromise, matEggVirusBlueRightPromise, matEggVirusBlueLeftPromise]).then(() => {
        egg1.hide()
        egg2.hide()
        egg3.hide()
        egg4.hide()
        eggRedVirusConfig = [ { objectConfig: EGG_VIRUSRED_LEFT, material: matEggVirusRedLeft }, { objectConfig: EGG_VIRUSRED_RIGHT, material: matEggVirusRedRight } ]
        eggBlueVirusConfig = [ { objectConfig: EGG_VIRUSBLUE_LEFT, material: matEggVirusBlueLeft }, { objectConfig: EGG_VIRUSBLUE_RIGHT, material: matEggVirusBlueRight } ]
    })
}

// return -1 if dropped on the left, 1 if dropped on the right, 0 if no virus dropped
const tick = (gameSpeed, eggDroppedCallback) => {
    const position = randomInt(1, 4) - 1
    const redBlueSelector = randomInt(1, 2) - 1
    const speed = Math.max(gameSpeed / 2, 350)

    egg1.step(speed, eggDroppedCallback)
    egg2.step(speed, eggDroppedCallback)
    egg3.step(speed, eggDroppedCallback)
    egg4.step(speed, eggDroppedCallback)

    const configAndMaterial = redBlueSelector == 0 ? eggRedVirusConfig[position % 2] : eggBlueVirusConfig[position % 2]

    const startConfig = {
        position,
        ...configAndMaterial
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