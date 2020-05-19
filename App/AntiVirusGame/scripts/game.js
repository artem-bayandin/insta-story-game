const Time = require('Time')
const Patches = require('Patches')

import { log } from './logger'

// masks:
// - void addMask()         // done
// - bool removeMask()      // done

// viruses:
// - [-1, 0, 1] tick()      // should return -1 if dropped on the left, 1 if dropped on the right, 0 if no virus dropped

// faces:
// - [-1, 0, 1] getSide()   // -1 if on the left, 1 if on the right, 0 if undefined state

const setNumberOfVirusesDropped = (others, droppedCounter, level, livesLeft) => {
    log(`numberOfVirusesDropped: ${droppedCounter}`)
    others.setText(droppedCounter, level, livesLeft)
}

const Game = (faces, masks, viruses, others, exitCallback) => {
    let ticksCounter = 0
    let droppedCounter = 0
    let level = 0

    let stageCapacity = 6
    let gameSpeed = 1750
    let go = true

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
            }
        }

        setNumberOfVirusesDropped(others, droppedCounter, level, masks.livesLeft())
    }

    const tick = () => {
        viruses.tick(gameSpeed, virusDroppedCallback)
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
        log(`Game started. Face: ${!!faces}, masks: ${!!masks}, viruses: ${!!viruses}, others: ${!!others}`)

        setNumberOfVirusesDropped(others, droppedCounter, level, masks.livesLeft())

        Time.setTimeout(() => {
            tick()
        }, gameSpeed)
    }

    return {
        play
    }
}

export default Game