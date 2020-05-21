const Time = require('Time')

import { log } from './logger'

// masks:
// - void addMask()         // done
// - bool removeMask()      // done 

// viruses:
// - [-1, 0, 1] tick()      // should return -1 if dropped on the left, 1 if dropped on the right, 0 if no virus dropped

// faces:
// - [-1, 0, 1] getSide()   // -1 if on the left, 1 if on the right, 0 if undefined state

const setNumberOfVirusesDropped = (texts, level, virusesDropped, livesLeft) => {
    texts.setText(level, virusesDropped, livesLeft)
}

const Game = (faces, masks, viruses, texts, exitCallback) => {
    let ticksCounter = 0
    let droppedCounter = 0
    let level = 0

    let stageCapacity = 6
    let gameSpeed = 1600
    let go = true

    let timeCounter = 0
    let timeInterval = null

    const increaseTickCounter = () => {
        ticksCounter++
        if (ticksCounter % stageCapacity === 0) {
            if (gameSpeed > 400) {
                gameSpeed -= 150
            }
            level++
            log(`Game Speed Up. Level: ${level}, speed: ${gameSpeed}, ticks: ${ticksCounter}, dropped: ${droppedCounter}, lives left: ${masks.livesLeft()}`)
        }
    }

    const virusDroppedCallback = (side) => {
        log(`VIRUS DROPPED ON ${side} SIDE`)
        if (!side) return

        droppedCounter++

        const faceSide = faces.getSide()

        if (side === faceSide) {
            const isAlive = masks.removeMask()
            if (!isAlive) {
                log('YOU DIED!')
                // terminate
                go = false
                Time.clearInterval(timeInterval)
            }
        }

        setNumberOfVirusesDropped(texts, level, droppedCounter, masks.livesLeft())
    }

    const tick = () => {
        viruses.tick(gameSpeed, virusDroppedCallback)
        // texts.setTime(timeCounter)

        // timeCounter += gameSpeed
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
        log(`Game started. Face: ${!!faces}, masks: ${!!masks}, viruses: ${!!viruses}, texts: ${!!texts}`)

        setNumberOfVirusesDropped(texts, level, droppedCounter, masks.livesLeft())

        tick()
        timeInterval = Time.setInterval(() => {
            texts.setTime(timeCounter)
            timeCounter += 100
        }, 100)
    }

    return {
        play
    }
}

export default Game