import { log, setTimeout, setInterval, clearInterval } from './utils'

const setNumberOfVirusesDropped = (textService, level, virusesDropped, livesLeft) => {
    textService.setText(level, virusesDropped, livesLeft)
}

const Game = ({services, exitCallback, gameSpeedOptions, energyOptions}) => {
    const { playerService, energyService, virusService, textService } = services
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

    const virusDroppedCallback = ({side, weight}) => {
        log(`VIRUS DROPPED ON ${side} SIDE`)
        if (!side) return

        increaseDroppedCounter()

        // TODO: how will I compare vertical position???
        const [ playerSideX, playerSideY ] = playerService.getSides()

        if (side === playerSideX) {
            energyService.addEnergy(weight)
            if (!energyService.isAlive()) {
                log('YOU DIED!')
                go = false
                clearInterval(timeInterval)
            }
        }

        setNumberOfVirusesDropped(textService, level, droppedCounter, energyService.capacityLeft())
    }

    const tick = () => {
        virusService.tick(gameSpeed, virusDroppedCallback)
        increaseTickCounter()
        if (go) {
            setTimeout(() => {
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
        setNumberOfVirusesDropped(textService, level, droppedCounter, energyService.capacityLeft())

        tick()

        timeInterval = setInterval(() => {
            textService.setTime(timeCounter)
            timeCounter += 100
        }, 100)
    }

    return {
        play
    }
}

export default Game