import { log } from './utils'

/*
 *  ENERGY SERVICE 
 */

let initialEnergy = 0
let capacity = 0
let capacityAdded = 0

const init = ({ energyOptions }) => {
    initialEnergy = energyOptions.initial
    capacity = initialEnergy
    log(`[energyService] initialized`)
}

const addEnergy = (amount) => {
    const newCapacity = capacity + amount
    capacity = newCapacity > 0 ? newCapacity : 0
    if (amount > 0) {
        capacityAdded += amount
    }
}

const capacityLeft = () => capacity

const isAlive = () => capacity > 0

const energyUsed = () => capacityAdded + initialEnergy

const energyService = {
    init,
    addEnergy,
    capacityLeft,
    isAlive,
    energyUsed
}

export default energyService