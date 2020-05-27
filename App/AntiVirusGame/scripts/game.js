import { log, setTimeout, setInterval, clearInterval } from './utils'

const setNumberOfEggsDropped = (textService, level, eggsDropped, livesLeft) => {
    textService.setText(level, eggsDropped, livesLeft)
}

const Game = ({services, exitCallback, gameSpeedOptions, energyOptions, gameMode}) => {
    const { playerService, energyService, eggService, textService } = services
    const { initialGameSpeed, gameSpeedStep, maxGameSpeed, initialStageCapacity } = gameSpeedOptions
    const { increaseWhenDropped } = energyOptions
    const { allowDrop, collect } = gameMode
    
    let ticksCounter = 0
    let droppedCounter = 0
    let level = 0

    let stageCapacity = initialStageCapacity
    let gameSpeed = initialGameSpeed
    let go = true

    let timeCounter = 0
    let timeInterval = null
    let timeIntervalDuration = 100

    let playing = false
    // let pausedTicksCounter = 0

    const increaseTickCounter = () => {
        ticksCounter++
        if (ticksCounter % stageCapacity === 0) {
            if (gameSpeed > maxGameSpeed) {
                gameSpeed -= gameSpeedStep
                if (gameSpeed < maxGameSpeed) {
                    gameSpeed = maxGameSpeed
                }
            }
            level++
            log(`Game Speed Up. Level: ${level}, speed: ${gameSpeed}, ticks: ${ticksCounter}, dropped: ${droppedCounter}, energy: ${energyService.capacityLeft()}`)
        }
    }

    const increaseDroppedCounter = () => {
        droppedCounter++
        if (droppedCounter % increaseWhenDropped == 0) {
            energyService.increase()
        }
    }

    const eggDroppedCallback = ({sides, weight, countDrop}) => {
        const [ eggSideX, eggSideY ] = sides
        const [ playerSideX, playerSideY ] = playerService.getSides()
        log(`EGG = ${eggSideX}:${eggSideY}, PLAYER = ${playerSideX}:${playerSideY}`)

        // TODO: is it still needed? if we have all the logic in { allowDrop, collect }
        // if (countDrop) {
        //     increaseDroppedCounter()
        // }
        // most likely, we need to count every egg with new logic
        // or not? fck...
        // increaseDroppedCounter()

                        // 2 positions: X must coinside
        const touched = allowDrop && eggSideX === playerSideX
                        // 4 positions - X:Y must coinside
                        || !allowDrop && eggSideX === playerSideX && eggSideY === playerSideY

 // update counters
if (allowDrop) {
    if (collect) {
        // => allowDrop && collect 
        // => collector mode (player on the ground)
        // update energy
        if (touched && weight < 0) {
            log(`killer touch - decrease energy`)
            energyService.addEnergy(weight)
        } else if (!touched && weight) {
            log(`healer missed - decrease energy`)
            energyService.addEnergy(0 - weight)
        }
        // update counter
        if (touched && weight) {
            log(`healer touched - increase counter`)
            increaseDroppedCounter()
        }
    } else {
        // => allowDrop && !collect
        // => survival mode (player on the ground)
        // update energy
        if (touched && weight < 0) {
            log(`killer touch - decrease energy`)
            energyService.addEnergy(weight)
        } else if (touched && weight) {
            log(`healer touch - increase energy`)
            energyService.addEnergy(weight)
        }
        // update counter
        if (!touched && weight < 0) {
            log(`killer missed - increase counter`)
            increaseDroppedCounter()
        }
    }
} else { // !allowDrop
    if (collect) {
        // => !allowDrop && collect 
        // => 4-points collector mode, aka standard 'Wolf and Eggs'
        // update energy
        if (touched && weight < 0) {
            log(`killer touch - decrease energy`)
            energyService.addEnergy(weight)
        } else if (touched && weight) {
            log(`healer touch - increase energy`)
            energyService.addEnergy(weight)
        }
        // update counter
        if (touched && weight) {
            log(`healer touched - increase counter`)
            increaseDroppedCounter()
        }
    } else {
        // => !allowDrop && !collect
        // FUCK, what's the hell is going on?))
        log(`Are you sure you need this mode?`)
        // update energy
        if (touched && weight < 0) {
            log(`killer touch - decrease energy`)
            energyService.addEnergy(weight)
        } else if (touched && weight) {
            log(`healer touch - increase energy`)
            energyService.addEnergy(weight)
        }
        // update counter
        if (!touched && weight < 0) {
            log(`killer missed - increase counter`)
            increaseDroppedCounter()
        }
    }
}

        /* old logic */

        // if (touched) {
        //     energyService.addEnergy(weight)

        //     if (!energyService.isAlive()) {
        //         log('YOU DIED!')
        //         go = false
        //         clearTimerInterval()
        //     }
        // }

        if (!energyService.isAlive()) {
            log('YOU DIED!')
            go = false
            clearTimerInterval()
        }

        setNumberOfEggsDropped(textService, level, droppedCounter, energyService.capacityLeft())
    }

    const tick = () => {
        if (playing) {
            eggService.tick(gameSpeed, eggDroppedCallback)
            increaseTickCounter()
            if (go) {
                setTimeout(() => {
                    if (go) {
                        tick()
                    } else {
                        exit()
                    }
                }, gameSpeed)
            } else {
                exit()
            }
        } else {
            setTimeout(tick, gameSpeed)
        }
    }

    const exit = () => {
        exitCallback({eggs: droppedCounter, time: timeCounter - timeIntervalDuration})
    }

    const setTimerInterval = () => {
        if (timeInterval) {
            clearInterval(timeInterval)
            timeInterval = null
        }
        timeInterval = setInterval(() => {
            textService.setTime(timeCounter)
            timeCounter += timeIntervalDuration
        }, timeIntervalDuration)
    }

    const clearTimerInterval = () => {
        if (timeInterval) {
            clearInterval(timeInterval)
        }
        timeInterval = null
    }

    const play = () => {
        setNumberOfEggsDropped(textService, level, droppedCounter, energyService.capacityLeft())
        playing = true
        tick()
        setTimerInterval()
    }

    const togglePlay = () => {
        if (playing) {
            // pause
            playing = false
            clearTimerInterval()
        } else {
            // resume
            if (go) {
                playing = true
                setTimerInterval()
            }
        }
    }

    return {
        play,
        togglePlay
    }
}

export default Game