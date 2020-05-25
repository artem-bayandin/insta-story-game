import { log } from './utils'

/*
 *  ENERGY SERVICE 
 */

let capacity = 0

const init = ({energyServiceOptions}) => {
    const { initial } = energyServiceOptions
    capacity = initial
    return 1
}

const addEnergy = (amount) => capacity += amount

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