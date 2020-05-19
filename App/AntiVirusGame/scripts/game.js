const Time = require('Time')

import { log } from './logger'

// masks:
// - void addMask()         // done
// - bool removeMask()      // done

// viruses:
// - [-1, 0, 1] tick()      // should return -1 if dropped on the left, 1 if dropped on the right, 0 if no virus dropped

// faces:
// - [-1, 0, 1] getSide()   // -1 if on the left, 1 if on the right, 0 if undefined state

const Game = (faces, masks, viruses, exitCallback) => {
    let counter = 0
    let stageCapacity = 8
    let gameSpeed = 2100
    let go = true

    const increaseTickCounter = () => {
        counter++
        if (counter % stageCapacity === 0 && gameSpeed > 222) {
            gameSpeed -= 111
        }
        log(`you've survided against ${counter} viruses!`)
    }

    // const virusDroppedCallback = (side) => {
    //     if (!side) return

    //     const faceSide = faces.getSide()

    //     if (side === faceSide) {
    //         const isAlive = masks.removeMask()
    //         if (!isAlive) {
    //             log('YOU DIED!')
    //             // terminate
    //             go = false          // move to class prop
    //         } else {
    //             // viruses.hideDropped()
    //             increaseTickCounter()
    //         }
    //     } else {
    //         // viruses.hideDropped()
    //         increaseTickCounter()
    //     }
    // }

    const tick = () => {
        const virusesTick = viruses.tick((side) => log(`VIRUS DROPPED ON ${side} SIDE`))
        const faceSide = faces.getSide()
        if (virusesTick) {
            if (virusesTick === faceSide) {
                const isAlive = masks.removeMask()
                if (!isAlive) {
                    log('YOU DIED!')
                    // terminate
                    go = false
                } else {
                    // viruses.hideDropped()
                    increaseTickCounter()
                }
            } else {
                // viruses.hideDropped()
                increaseTickCounter()
            }
        }
        if (go) {
            // increaseTickCounter()
            Time.setTimeout(() => {
                tick()
            }, gameSpeed)
        } else {
            exitCallback(counter)
        }
    }

    const play = () => {
        log(`Game started. Face: ${!!faces}, masks: ${!!masks}, viruses: ${!!viruses}`)

        Time.setTimeout(() => {
            tick()
        }, gameSpeed)
    }

    return {
        play
    }
}

export default Game