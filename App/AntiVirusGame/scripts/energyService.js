import { log } from './logger'

/*
 *  ENERGY SERVICE 
 */

let capacity = 0

const init = (initialCapacity) => {
    capacity = initialCapacity
    return 1
}

const increase = () => {
    capacity++
}

const decrease = () => {
    capacity--
    if (capacity < 1) {
        log('you died...(')
    } else {
        log(`---------------------------------------------------------------------   LIVES:   ${capacity}`)
    }
    return capacity > 0
}

const capacityLeft = () => capacity

const energyService = {
    init,
    increase,
    decrease,
    capacityLeft
}

export default energyService