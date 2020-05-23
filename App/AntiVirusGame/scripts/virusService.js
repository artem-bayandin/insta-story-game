import { findMe } from './utils'
import { log } from './logger'
import { Virus, V } from './virus' 

/*
 *  VIRUS SERVICE 
 */

let topLeft = null
let topRight = null
let bottomLeft = null
let bottomRight = null

const initVirus = (identifier) => {
    return new Promise((res, rej) => {
        findMe(identifier).then(item => {
                const virus = new Virus(identifier, item)
                res(virus)
            })
    })
}

const init = () => {
    var promise1 = initVirus('virus1').then(obj => topLeft = obj)
    var promise2 = initVirus('virus2').then(obj => bottomLeft = obj)
    var promise3 = initVirus('virus3').then(obj => topRight = obj)
    var promise4 = initVirus('virus4').then(obj => bottomRight = obj)

    return Promise.all([promise1, promise2, promise3, promise4]).then(() => {
        log(JSON.stringify(topLeft))
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