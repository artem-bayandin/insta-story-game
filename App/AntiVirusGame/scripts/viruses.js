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
                log(`topLeft virus: ${topLeft.id}`)
            })
    var promise2 = initVirus('virus2')
            .then(obj => {
                bottomLeft = obj
                log(`bottomLeft virus: ${bottomLeft.id}`)
            })
    var promise3 = initVirus('virus3')
            .then(obj => {
                topRight = obj
                log(`topRight virus: ${topRight.id}`)
            })
    var promise4 = initVirus('virus4')
            .then(obj => {
                bottomRight = obj
                log(`bottomRight virus: ${bottomRight.id}`)
            })

    return Promise.all([promise1, promise2, promise3, promise4])
}

const rand = () => +(Math.random() * 4).toFixed(0) % 4

// return -1 if dropped on the left, 1 if dropped on the right, 0 if no virus dropped
const tick = () => {
    log(`viruses tick ${rand()}`)
    return 1
}

const hideDropped = () => {

}

const viruses = {
    init,
    tick,
    hideDropped
}

export default viruses