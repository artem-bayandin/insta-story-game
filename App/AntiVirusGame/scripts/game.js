import { log, setTimeout, setInterval, clearInterval } from './utils'

const setNumberOfEggsDropped = (textService, level, eggsDropped, livesLeft) => {
    textService.setText(level, eggsDropped, livesLeft)
}

const Game = ({services, exitCallback, gameSpeedOptions, energyOptions, gameMode}) => {
    const { playerService, energyService, eggService, textService } = services
    const { initialGameSpeed, gameSpeedStep, maxGameSpeed, initialStageCapacity } = gameSpeedOptions
    const { increaseWhenDropped } = energyOptions
    
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

        if (countDrop) {
            increaseDroppedCounter()
        }

        log(`EGG = ${eggSideX}:${eggSideY}, PLAYER = ${playerSideX}:${playerSideY}`)

        if (// 2 positions: X must coinside
            gameMode.allowDrop && eggSideX === playerSideX
            || 
            // 4 positions - X:Y must coinside
            !gameMode.allowDrop && eggSideX === playerSideX && eggSideY === playerSideY
            ) {
            energyService.addEnergy(weight)

            if (!energyService.isAlive()) {
                log('YOU DIED!')
                go = false
                clearTimerInterval()
            }
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