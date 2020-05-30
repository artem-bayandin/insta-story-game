import { log, setTimeout, setInterval, clearInterval } from './utils'
import playerService from './playerService'
import energyService from './energyService'
import eggService from './eggService'
import textService from './textService'
import { INTERACTION_RESULTS } from './commonConstants'

const setNumberOfEggsDropped = (textService, level, eggsDropped, livesLeft) => {
    textService.setText(level, eggsDropped, livesLeft)
}

const Game = ({ exitCallback, gameSpeedOptions, energyOptions, gameMode }) => {
    const { initialGameSpeed, maxGameSpeed, initialStageCapacity, gameSpeeds } = gameSpeedOptions
    const { increaseWhenDropped } = energyOptions
    const { allowDrop, collect } = gameMode
    
    let ticksCounter = 0
    let droppedCounter = 0
    let level = 0

    let stageCapacity = initialStageCapacity
    let gameSpeedSettings = gameSpeeds.shift()
    let gameSpeedStep = gameSpeedSettings.step
    let gameSpeedDelimiter = gameSpeedSettings.delimiter
    let gameSpeed = initialGameSpeed
    let go = true

    let timeCounter = 0
    let timeInterval = null
    let timeIntervalDuration = 1000

    let playing = false

    let timestamp = null

    const increaseTickCounter = () => {
        ticksCounter++
        if (ticksCounter % stageCapacity === 0) {
            if (gameSpeed > maxGameSpeed) {
                // update gameSpeedStep
                if (gameSpeed <= gameSpeedDelimiter && gameSpeeds.length) {
                    gameSpeedSettings = gameSpeeds.shift()
                    gameSpeedStep = gameSpeedSettings.step
                    gameSpeedDelimiter = gameSpeedSettings.delimiter
                }
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
            informAboutInteraction(INTERACTION_RESULTS.EXTRA_LIFE)
        } else {
            informAboutInteraction(INTERACTION_RESULTS.GOOD)
        }
    }

    const informAboutInteraction = (text) => {
        textService.setInteractionResult(text, gameSpeed - 100)
    }

    const eggDroppedCallback = ({sides, weight}) => {
        const [ eggSideX, eggSideY ] = sides
        const [ playerSideX, playerSideY ] = playerService.getSides()
        // log(`EGG = ${eggSideX}:${eggSideY}, PLAYER = ${playerSideX}:${playerSideY}`)
                        
        const touched = 
            // 2 positions: X must coinside
            allowDrop && eggSideX === playerSideX
            // 4 positions - X:Y must coinside
            || !allowDrop && eggSideX === playerSideX && eggSideY === playerSideY

        // it happened so, that score logic does not depend on allowDrop
        if (collect) {
            if (touched && weight < 0) {
                // log(`killer touch - decrease energy`)
                energyService.addEnergy(weight)
                informAboutInteraction(INTERACTION_RESULTS.OUCH)
            } else if (touched && weight) {
                // log(`healer touch - increase counter`)
                increaseDroppedCounter()
                // interaction is included in increaseDroppedCounter()
                // informAboutInteraction(INTERACTION_RESULTS.GOOD)
            } else if (!touched && weight < 0) {
                // log(`killer missed - do nothing`)
                informAboutInteraction(INTERACTION_RESULTS.GOOD)
            } else if (!touched && weight) {
                // log(`healer missed - decrease energy`)
                energyService.addEnergy(0 - weight)
                informAboutInteraction(INTERACTION_RESULTS.OUCH)
            }
        } else {
            if (touched && weight < 0) {
                // log(`killer touch - decrease energy`)
                energyService.addEnergy(weight)
                informAboutInteraction(INTERACTION_RESULTS.OUCH)
            } else if (touched && weight) {
                // log(`healer touch - increase energy`)
                energyService.addEnergy(weight)
                informAboutInteraction(INTERACTION_RESULTS.EXTRA_LIFE)
            } else if (!touched && weight < 0) {
                // log(`killer missed - increase counter`)
                increaseDroppedCounter()
                // interaction is included in increaseDroppedCounter()
                // informAboutInteraction(INTERACTION_RESULTS.GOOD)
            } else if (!touched && weight) {
                // log(`healer missed - do nothing`)
                informAboutInteraction(INTERACTION_RESULTS.OUCH)
            }
        }

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
        textService.setTime(timeCounter + timeIntervalDuration)
        exitCallback({eggs: droppedCounter, time: new Date().getTime() - timestamp})
    }

    const setTimerInterval = () => {
        if (timeInterval) {
            log(`this should not happen`)
            clearInterval(timeInterval)
            timeInterval = null
        }
        timeInterval = setInterval(() => {
            timeCounter += timeIntervalDuration
            textService.setTime(timeCounter)
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
        textService.setTime(timeCounter)
        playing = true
        timestamp = new Date().getTime()
        tick()
        setTimerInterval()
    }

    const togglePlay = () => {
        // TODO: refactor to properly set 'timestamp'
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