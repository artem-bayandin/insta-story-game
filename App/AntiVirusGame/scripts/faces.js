const Scene = require('Scene')

import { log } from './logger'
import initFace from './face'

let face = null

const init = () => {
    var promise1 = initFace('face')
            .then(obj => {
                face = obj
                log(`face: ${face.id}`)
            })

    return Promise.all([promise1])
}

const say = () => face.hello()

const faces = {
    init,
    say
}

export default faces