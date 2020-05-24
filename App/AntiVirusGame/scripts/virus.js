const Time = require('Time')

import { log } from './logger'
import { createWithId, createWithCoordinates, createWithShowHide, createWithMove } from './inheritance'
import { VIRUS_COORDINATES, VIRUS_DEFAULT } from './virusConstants'

const fastAnimationSpeed = 10

export const Virus = (id, obj) => {
    let routes = null
    let currentPosition = -1
    let config = VIRUS_DEFAULT

    const start = (num, objectConfig) => {
        config = objectConfig
        routes = VIRUS_COORDINATES.GLOBAL_ROUTES[num]
        currentPosition = 0
        base.moveTo(routes[0].x, routes[0].y, fastAnimationSpeed)
        base.show()
    }

    const step = (speed, virusDroppedCallback) => {
        const innerSpeed = speed / 2
        const dropSpeed = innerSpeed / 2

        if (!base.isVisible()) return

        if (currentPosition >= 0 && currentPosition < 2) {
            currentPosition++
            base.moveTo(routes[currentPosition].x, routes[currentPosition].y, innerSpeed)
            return
        }
        
        if (currentPosition == 2) {
            // move to the end and drop
            currentPosition++
            let onMoveCompleted = () => {
                log(`virus '${id}' is on the edge!`)
                currentPosition++
                let onDroppedCompleted = () => {
                    base.hide()
                    currentPosition = -1
                }
                base.moveTo(routes[routes.length - 1].x, routes[routes.length - 1].y, dropSpeed, onDroppedCompleted)
                
                let side = routes[currentPosition].x < 0 ? -1 : 1
                Time.setTimeout(() => {
                    virusDroppedCallback(side)
                }, dropSpeed / 2)
            }
            base.moveTo(routes[currentPosition].x, routes[currentPosition].y, innerSpeed, onMoveCompleted)
            return
        }
    }

    let base = {
        ...createWithCoordinates(obj),
        ...createWithId(id),
        ...createWithShowHide(obj, fastAnimationSpeed, config.SCALE_X, config.SCALE_Y),
        ...createWithMove(obj),
        start,
        step
    }

    return base
}