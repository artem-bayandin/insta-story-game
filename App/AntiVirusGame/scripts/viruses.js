const Time = require('Time')

import { log } from './logger'
import initVirus from './virus'

let topLeft = null
let topRight = null
let bottomLeft = null
let bottomRight = null

const init = () => {
    var promise1 = initVirus('virus1')
            .then(obj => {
                topLeft = obj
                log(`topLeft virus loaded: ${topLeft.getId()}`)
            })
    var promise2 = initVirus('virus2')
            .then(obj => {
                bottomLeft = obj
                log(`bottomLeft virus loaded: ${bottomLeft.getId()}`)
            })
    var promise3 = initVirus('virus3')
            .then(obj => {
                topRight = obj
                log(`topRight virus loaded: ${topRight.getId()}`)
            })
    var promise4 = initVirus('virus4')
            .then(obj => {
                bottomRight = obj
                log(`bottomRight virus loaded: ${bottomRight.getId()}`)
            })
    
    log('loading viruses...')

    return Promise.all([promise1, promise2, promise3, promise4]).then(() => {
        topLeft.hide()
        bottomLeft.hide()
        topRight.hide()
        bottomRight.hide()
    })
}

const rand = () => +(Math.random() * 4).toFixed(0) % 4

// return -1 if dropped on the left, 1 if dropped on the right, 0 if no virus dropped
const tick = () => {
    const rndValue = rand()

    const speed = 400

    var stepResults = [
        topLeft.step(speed)
      , bottomLeft.step(speed)
      , topRight.step(speed)
      , bottomRight.step(speed)
    ]

    if (!topLeft.isVisible()) {
        // log(`start 1 at ${rndValue}`)
        topLeft.start(rndValue)
    } else if (!bottomLeft.isVisible()) {
        // log(`start 2 at ${rndValue}`)
        bottomLeft.start(rndValue)
    } else if (!topRight.isVisible()) {
        // log(`start 3 at ${rndValue}`)
        topRight.start(rndValue)
    } else if (!bottomRight.isVisible()) {
        // log(`start 4 at ${rndValue}`)
        bottomRight.start(rndValue)
    }

    log(`viruses tick ${rndValue}, step results: ${JSON.stringify(stepResults)}`)

    const filteredResult = stepResults.filter(res => res[0] !== 0)
    if (filteredResult && filteredResult.length) {
        const [ value, timeout ] = filteredResult[0]
        return value
    }

    return 0
}

const viruses = {
    init,
    tick
}

export default viruses