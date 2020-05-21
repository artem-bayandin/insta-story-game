import { log } from './logger'

let numberOfMasks = 0

const init = (numOfMasks) => {
    numberOfMasks = numOfMasks
    return 1
}

const addMask = () => {
    numberOfMasks++
}

const removeMask = () => {
    numberOfMasks--
    if (numberOfMasks < 1) {
        log('you died...(')
    } else {
        log(`---------------------------------------------------------------------   LIVES:   ${numberOfMasks}`)
    }
    return numberOfMasks > 0
}

const livesLeft = () => numberOfMasks

const masks = {
    addMask,
    removeMask,
    init,
    livesLeft
}

export default masks