import { findMe, findMaterial, randomInt, log } from './utils'
import { Virus } from './virus' 
import { VIRUS_RED_RIGHT, VIRUS_RED_LEFT, VIRUS_BLUE_RIGHT, VIRUS_BLUE_LEFT } from './virusConstants'

/*
 *  VIRUS SERVICE 
 */

let virus1 = null
let virus3 = null
let virus2 = null
let virus4 = null

let matVirusRedRight = null
let matVirusRedLeft = null
let matVirusBlueRight = null
let matVirusBlueLeft = null

const initVirus = (identifier) => {
    return new Promise((res, rej) => {
        findMe(identifier).then(item => {
            const virus = new Virus(identifier, item)
            res(virus)
        })
    })
}

const init = () => {
    var promise1 = new Promise((res, rej) => {
            initVirus('virus1').then(obj => {
                virus1 = obj
                res(virus1)
            })
        })
    var promise2 = new Promise((res, rej) => {
            initVirus('virus2').then(obj => {
                virus2 = obj
                res(virus2)
            })
        })
    var promise3 = new Promise((res, rej) => {
            initVirus('virus3').then(obj => {
                virus3 = obj
                res(virus3)
            })
        })
    var promise4 = new Promise((res, rej) => {
            initVirus('virus4').then(obj => {
                virus4 = obj
                res(virus4)
            })
        })
    var matVirusRedRightPromise = new Promise((res, rej) => {
        findMaterial(VIRUS_RED_RIGHT.MATERIAL).then(mat => {
            log(`material found: ${VIRUS_RED_RIGHT.MATERIAL}`)
            matVirusRedRight = mat
            res(matVirusRedRight)
        })
    })
    var matVirusRedLeftPromise = new Promise((res, rej) => {
        findMaterial(VIRUS_RED_LEFT.MATERIAL).then(mat => {
            log(`material found: ${VIRUS_RED_LEFT.MATERIAL}`)
            matVirusRedLeft = mat
            res(matVirusRedLeft)
        })
    })
    var matVirusBlueRightPromise = new Promise((res, rej) => {
        findMaterial(VIRUS_BLUE_RIGHT.MATERIAL).then(mat => {
            log(`material found: ${VIRUS_BLUE_RIGHT.MATERIAL}`)
            matVirusBlueRight = mat
            res(matVirusBlueRight)
        })
    })
    var matVirusBlueLeftPromise = new Promise((res, rej) => {
        findMaterial(VIRUS_BLUE_LEFT.MATERIAL).then(mat => {
            log(`material found: ${VIRUS_BLUE_LEFT.MATERIAL}`)
            matVirusBlueLeft = mat
            res(matVirusBlueLeft)
        })
    })

    return Promise.all([promise1, promise2, promise3, promise4
        , matVirusRedRightPromise, matVirusRedLeftPromise, matVirusBlueRightPromise, matVirusBlueLeftPromise]).then(() => {
        virus1.hide()
        virus2.hide()
        virus3.hide()
        virus4.hide()
    })
}

// return -1 if dropped on the left, 1 if dropped on the right, 0 if no virus dropped
const tick = (gameSpeed, virusDroppedCallback) => {
    const rndValue4 = randomInt(0, 4)
    const rndValue2 = randomInt(0, 2)
    const speed = Math.max(gameSpeed / 2, 350)

    virus1.step(speed, virusDroppedCallback)
    virus2.step(speed, virusDroppedCallback)
    virus3.step(speed, virusDroppedCallback)
    virus4.step(speed, virusDroppedCallback)

    const configAndMaterial = rndValue2 == 0
                                    ? { objectConfig: VIRUS_RED_RIGHT, material: matVirusRedRight }
                                    : { objectConfig: VIRUS_BLUE_LEFT, material: matVirusBlueLeft }
    const startConfig = {
        position: rndValue4,
        ...configAndMaterial
    }

    log(`${JSON.stringify(startConfig)}`)

    if (!virus1.isVisible()) {
        virus1.start(startConfig)
    } else if (!virus2.isVisible()) {
        virus2.start(startConfig)
    } else if (!virus3.isVisible()) {
        virus3.start(startConfig)
    } else if (!virus4.isVisible()) {
        virus4.start(startConfig)
    }
}

const virusService = {
    init,
    tick
} 

export default virusService