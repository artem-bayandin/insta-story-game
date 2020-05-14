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

// return -1 if on the left, 1 if on the right, 0 if undefined state
const getSide = () => {
    const [ x, y ] = face.getCoordinates()
    log(`face coords: ${x}:${y}`)
    return x >= 40 ? 1 : x <= -40 ? -1 : 0
}

const faces = {
    init,
    say,
    getSide,
}

export default faces