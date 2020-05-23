const Time = require('Time')

import { log } from './logger'

// energyService:
// - void increase()         // done
// - bool decrease()      // done 

// virusService:
// - [-1, 0, 1] tick()      // should return -1 if dropped on the left, 1 if dropped on the right, 0 if no virus dropped

// playerService:
// - [-1, 0, 1] getSide()   // -1 if on the left, 1 if on the right, 0 if undefined state

const setNumberOfVirusesDropped = (textService, level, virusesDropped, livesLeft) => {
    textService.setText(level, virusesDropped, livesLeft)
}

const Game = (playerService, energyService, virusService, textService, exitCallback) => {
    let ticksCounter = 0
    let droppedCounter = 0
    let level = 0

    let stageCapacity = 6
    let gameSpeed = 1350
    let go = true

    let timeCounter = 0
    let timeInterval = null

    const increaseTickCounter = () => {
        ticksCounter++
        if (ticksCounter % stageCapacity === 0) {
            if (gameSpeed > 450) {
                gameSpeed -= 150
            }
            level++
            log(`Game Speed Up. Level: ${level}, speed: ${gameSpeed}, ticks: ${ticksCounter}, dropped: ${droppedCounter}, Energy service: ${energyService.capacityLeft()}`)
        }
    }

    const increaseDroppedCounter = () => {
        droppedCounter++
        if (droppedCounter % 10 == 0) {
            energyService.increase()
        }
    }

    const virusDroppedCallback = (side) => {
        log(`VIRUS DROPPED ON ${side} SIDE`)
        if (!side) return

        increaseDroppedCounter()

        const playerSide = playerService.getSide()

        if (side === playerSide) {
            const isAlive = energyService.decrease()
            if (!isAlive) {
                log('YOU DIED!')
                // terminate
                go = false
                Time.clearInterval(timeInterval)
            }
        }

        setNumberOfVirusesDropped(textService, level, droppedCounter, energyService.capacityLeft())
    }

    const tick = () => {
        virusService.tick(gameSpeed, virusDroppedCallback)
        increaseTickCounter()
        if (go) {
            Time.setTimeout(() => {
                if (go) {
                    tick()
                } else {
                    exitCallback(droppedCounter)
                }
            }, gameSpeed)
        } else {
            exitCallback(droppedCounter)
        }
    }

    const play = () => {
        log(`Game started. Player service: ${!!playerService}, Energy service: ${!!energyService}, Virus service: ${!!virusService}, Text service: ${!!textService}`)

        setNumberOfVirusesDropped(textService, level, droppedCounter, energyService.capacityLeft())

        tick()
        timeInterval = Time.setInterval(() => {
            textService.setTime(timeCounter)
            timeCounter += 100
        }, 100)
    }

    return {
        play
    }
}

export default Game