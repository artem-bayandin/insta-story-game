import { log } from './utils'

/*
 *  ENERGY SERVICE 
 */

let capacity = 0

const init = ({ energyOptions }) => {
    const { initial } = energyOptions
    capacity = initial
    return 1
}

const addEnergy = (amount) => {
    const newCapacity = capacity + amount
    capacity = newCapacity > 0 ? newCapacity : 0
}

const increase = () => {
    capacity++
}

const decrease = () => {
    capacity--
}

const capacityLeft = () => capacity

const isAlive = () => capacity > 0

const energyService = {
    init,
    addEnergy,
    increase,
    decrease,
    capacityLeft,
    isAlive
}

export default energyService