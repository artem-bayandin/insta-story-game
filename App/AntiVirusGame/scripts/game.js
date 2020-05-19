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

const setNumberOfVirusesDropped = (others, number) => {
    log(`numberOfVirusesDropped: ${number}`)
    let str = number ? number.toString() : '0'
    Patches.inputs.setString('numberOfVirusesDropped', str)
    others.setText(str)
}

const Game = (faces, masks, viruses, others, exitCallback) => {
    let counter = 0
    let stageCapacity = 8
    let gameSpeed = 2100
    let go = true

    const increaseTickCounter = () => {
        counter++
        if (counter % stageCapacity === 0 && gameSpeed > 222) {
            gameSpeed -= 111
        }
    }

    const virusDroppedCallback = (side) => {
        log(`VIRUS DROPPED ON ${side} SIDE`)
        if (!side) return

        increaseTickCounter()
        setNumberOfVirusesDropped(others, counter.toString())

        const faceSide = faces.getSide()

        if (side === faceSide) {
            const isAlive = masks.removeMask()
            if (!isAlive) {
                log('YOU DIED!')
                // terminate
                go = false
            }
        }
    }

    const tick = () => {
        viruses.tick(virusDroppedCallback)
        if (go) {
            Time.setTimeout(() => {
                if (go) {
                    tick()
                } else {
                    exitCallback(counter)
                }
            }, gameSpeed)
        } else {
            exitCallback(counter)
        }
    }

    const play = () => {
        log(`Game started. Face: ${!!faces}, masks: ${!!masks}, viruses: ${!!viruses}, others: ${!!others}`)

        setNumberOfVirusesDropped(others, 0)

        Time.setTimeout(() => {
            tick()
        }, gameSpeed)
    }

    return {
        play
    }
}

export default Game