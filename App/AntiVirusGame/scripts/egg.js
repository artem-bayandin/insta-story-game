import { log, setTimeout, MOVE_TYPES } from './utils'
import { createWithShowHide, createWithMove, createBase } from './inheritance'
import { EGG_COORDINATES, EGG_VIRUSRED_RIGHT } from './eggConstants'
import materialService from './materialService'
import { SIDE } from './commonConstants'

const fastAnimationSpeed = 10

/*
 *  EGG ENTITY
 */

export const Egg = (id, obj) => {
    let routes = null
    let currentPosition = -1
    let config = EGG_VIRUSRED_RIGHT
    let callback = null
    let dropAllowed = false

    const start = ({position, objectConfig, eggDroppedCallback, allowDrop}) => {
        callback = eggDroppedCallback
        dropAllowed = allowDrop

        // if (config.ID !== objectConfig.ID) {
            config = objectConfig
            obj.material = materialService.get(config.MATERIAL)
            obj.transform.scaleX = config.SCALE_X
            obj.transform.scaleY = config.SCALE_Y
        // }

        routes = EGG_COORDINATES.GLOBAL_ROUTES[position]
        currentPosition = 0
        base.moveTo(routes[0].x, routes[0].y, fastAnimationSpeed)
        base.show()
    }

    const step = (speed) => {
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

            let sideX = routes[currentPosition].x < 0 ? SIDE.LEFT : SIDE.RIGHT
            let sideY = routes[currentPosition].y == EGG_COORDINATES.Y_TOP_ROW ? SIDE.TOP : SIDE.BOTTOM

            let hideAndResetPosition = () => {
                base.hide()
                currentPosition = -1
            }

            let onMoveCompleted = () => {
                if (dropAllowed) {
                    base.moveTo(routes[routes.length - 1].x, routes[routes.length - 1].y, dropSpeed, hideAndResetPosition)
                    
                    setTimeout(() => {
                        callback({sides: [ sideX, SIDE.NEUTRAL ], weight: config.WEIGHT})
                    }, dropSpeed / 2)
                } else {
                    callback({sides: [ sideX, sideY ], weight: config.WEIGHT})
                    hideAndResetPosition()
                }
            }
            base.moveTo(routes[currentPosition].x, routes[currentPosition].y, innerSpeed, onMoveCompleted)
            return
        }
    }

    let base = {
        ...createBase(id, obj),
        ...createWithShowHide(obj, fastAnimationSpeed, config.SCALE_X, config.SCALE_Y),
        ...createWithMove(obj, MOVE_TYPES.EASE_OUT_CUBIC),
        start,
        step
    }

    return base
}