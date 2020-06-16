import { log } from './utils'

/*
 *  ENERGY SERVICE 
 */

let initialEnergy = 0
let capacity = 0
let capacityAdded = 0

const internalInit = (energyOptions) => {
    initialEnergy = energyOptions.initial
    capacity = initialEnergy
}

const init = ({ energyOptions }) => {
    internalInit(energyOptions)
    log(`[energyService] initialized`)
}

const reset = ({ energyOptions }) => {
    internalInit(energyOptions)
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
    energyUsed,
    reset
}

export default energyService