import { findMe, findMaterial, randomIntFromZeroToX } from './utils'
import { Virus } from './virus' 
import { VIRUS_DEFAULT, VIRUS_BLUE } from './virusConstants'

/*
 *  VIRUS SERVICE 
 */

let topLeft = null
let topRight = null
let bottomLeft = null
let bottomRight = null

let materialDefault = null
let materialVirusBlue = null

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
                topLeft = obj
                res(topLeft)
            })
        })
    var promise2 = new Promise((res, rej) => {
            initVirus('virus2').then(obj => {
                bottomLeft = obj
                res(bottomLeft)
            })
        })
    var promise3 = new Promise((res, rej) => {
            initVirus('virus3').then(obj => {
                topRight = obj
                res(topRight)
            })
        })
    var promise4 = new Promise((res, rej) => {
            initVirus('virus4').then(obj => {
                bottomRight = obj
                res(bottomRight)
            })
        })
    var materialDefaultPromise = new Promise((res, rej) => {
        findMaterial(VIRUS_DEFAULT.MATERIAL).then(mat => {
            materialDefault = mat
            res(materialDefault)
        })
    })
    var materialVirusBluePromise = new Promise((res, rej) => {
        findMaterial(VIRUS_BLUE.MATERIAL).then(mat => {
            materialVirusBlue = mat
            res(materialVirusBlue)
        })
    })

    return Promise.all([promise1, promise2, promise3, promise4, materialDefaultPromise, materialVirusBluePromise]).then(() => {
        topLeft.hide()
        bottomLeft.hide()
        topRight.hide()
        bottomRight.hide()
    })
}

// return -1 if dropped on the left, 1 if dropped on the right, 0 if no virus dropped
const tick = (gameSpeed, virusDroppedCallback) => {
    const rndValue4 = randomIntFromZeroToX(4)
    const rndValue2 = randomIntFromZeroToX(2)
    const speed = Math.max(gameSpeed / 2, 350)

    topLeft.step(speed, virusDroppedCallback)
    bottomLeft.step(speed, virusDroppedCallback)
    topRight.step(speed, virusDroppedCallback)
    bottomRight.step(speed, virusDroppedCallback)

    const configAndMaterial = rndValue2 == 0
                                    ? { objectConfig: VIRUS_DEFAULT, material: materialDefault }
                                    : { objectConfig: VIRUS_BLUE, material: materialVirusBlue }
    const startConfig = {
        position: rndValue4,
        ...configAndMaterial
    }

    if (!topLeft.isVisible()) {
        topLeft.start(startConfig)
    } else if (!bottomLeft.isVisible()) {
        bottomLeft.start(startConfig)
    } else if (!topRight.isVisible()) {
        topRight.start(startConfig)
    } else if (!bottomRight.isVisible()) {
        bottomRight.start(startConfig)
    }
}

const virusService = {
    init,
    tick
} 

export default virusService