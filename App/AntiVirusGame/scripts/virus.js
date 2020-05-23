const Time = require('Time')

import { log } from './logger'
import { createWithId, createWithCoordinates, createWithShowHide, createWithMove } from './inheritance'

const virusScaleX = 666
const virusScaleY = 623
const fastAnimationSpeed = 10

const dropLeft         = { x: -50, y: -180 }
const dropRight        = { x:  50, y: -180 }
const topLeftSteps     = [{ x: -155, y: 215 }, { x: -120, y: 200 }, { x: -85, y: 185 }, { x: -50, y: 170 }, dropLeft]
const bottomLeftSteps  = [{ x: -155, y:  65 }, { x: -120, y:  50 }, { x: -85, y:  35 }, { x: -50, y:  20 }, dropLeft]
const topRightSteps    = [{ x:  155, y: 215 }, { x:  120, y: 200 }, { x:  85, y: 185 }, { x:  50, y: 170 }, dropRight]
const bottomRightSteps = [{ x:  155, y:  65 }, { x:  120, y:  50 }, { x:  85, y:  35 }, { x:  50, y:  20 }, dropRight]
const globalRoutes     = [ topLeftSteps, bottomLeftSteps, topRightSteps, bottomRightSteps ]

export const Virus = (id, obj) => {
    let routes = null
    let currentPosition = -1

    const start = (num) => {
        routes = globalRoutes[num]
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
                    log(`virus '${id}' dopped!`)
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
        ...createWithShowHide(obj, fastAnimationSpeed, virusScaleX, virusScaleY),
        ...createWithMove(obj),
        start,
        step
    }

    return base
}