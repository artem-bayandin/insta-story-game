import { findMe } from './utils'
import { Virus } from './virus' 

/*
 *  VIRUS SERVICE 
 */

let topLeft = null
let topRight = null
let bottomLeft = null
let bottomRight = null

const initVirus = (identifier) => {
    return new Promise((res, rej) => {
        findMe(identifier)
            .then(item => {
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

    return Promise.all([promise1, promise2, promise3, promise4]).then(() => {
        topLeft.hide()
        bottomLeft.hide()
        topRight.hide()
        bottomRight.hide()
    })
}

const rand = () => +(Math.random() * 4).toFixed(0) % 4

// return -1 if dropped on the left, 1 if dropped on the right, 0 if no virus dropped
const tick = (gameSpeed, virusDroppedCallback) => {
    
    const rndValue = rand()

    const speed = Math.max(gameSpeed / 2, 350)

    topLeft.step(speed, virusDroppedCallback)
    bottomLeft.step(speed, virusDroppedCallback)
    topRight.step(speed, virusDroppedCallback)
    bottomRight.step(speed, virusDroppedCallback)

    if (!topLeft.isVisible()) {
        topLeft.start(rndValue)
    } else if (!bottomLeft.isVisible()) {
        bottomLeft.start(rndValue)
    } else if (!topRight.isVisible()) {
        topRight.start(rndValue)
    } else if (!bottomRight.isVisible()) {
        bottomRight.start(rndValue)
    }
}

const virusService = {
    init,
    tick
} 

export default virusService