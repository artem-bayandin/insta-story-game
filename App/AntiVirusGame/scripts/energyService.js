import { log } from './logger'

/*
 *  ENERGY SERVICE 
 */

let capacity = 0

const init = ({energyOptions}) => {
    const { initial } = energyOptions
    capacity = initial
    return 1
}

const increase = () => {
    capacity++
}

const decrease = () => {
    capacity--
    if (capacity < 1) {
        log('you died...(')
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