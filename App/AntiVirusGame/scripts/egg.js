import { log, setTimeout, MOVE_TYPES } from './utils'
import { createWithShowHide, createWithMove, createBase } from './inheritance'
import { EGG_COORDINATES, EGG_VIRUS_RED } from './eggConstants'
import materialService from './materialService'
import { SIDE } from './commonConstants'

const fastAnimationSpeed = 10

/*
 *  EGG ENTITY
 */

export const Egg = (id, obj) => {
    let currentRoute = null
    let currentPosition = -1
    let config = EGG_VIRUS_RED
    let callback = null
    let dropAllowed = false

    const start = ({route, allowDrop, eggCallback, objectConfig, newMaterial}) => {
        callback = eggCallback
        dropAllowed = allowDrop

        // if (config.ID !== objectConfig.ID) {
            config = objectConfig
            obj.material = materialService.get(newMaterial)
            obj.transform.scaleX = config.SCALE_X
            obj.transform.scaleY = config.SCALE_Y
        // }

        currentRoute = route
        currentPosition = 0
        base.moveTo(currentRoute[0].x, currentRoute[0].y, fastAnimationSpeed)
        base.show()
    }

    const step = (speed) => {
        const innerSpeed = speed / 2
        const dropSpeed = innerSpeed / 2

        if (!base.isVisible()) return

        if (currentPosition >= 0 && currentPosition < 2) {
            currentPosition++
            base.moveTo(currentRoute[currentPosition].x, currentRoute[currentPosition].y, innerSpeed)
            return
        }
        
        if (currentPosition == 2) {
            // move to the end and drop
            currentPosition++

            let sideX = currentRoute[currentPosition].x < 0 ? SIDE.LEFT : SIDE.RIGHT
            let sideY = currentRoute[currentPosition].y == EGG_COORDINATES.Y_TOP_ROW ? SIDE.TOP : SIDE.BOTTOM

            let hideAndResetPosition = () => {
                base.hide()
                currentPosition = -1
            }

            let onMoveCompleted = () => {
                if (dropAllowed) {
                    base.moveTo(currentRoute[currentRoute.length - 1].x, currentRoute[currentRoute.length - 1].y, dropSpeed, hideAndResetPosition)
                    
                    setTimeout(() => {
                        callback({sides: [ sideX, SIDE.NEUTRAL ], weight: config.WEIGHT})
                    }, dropSpeed / 2)
                } else {
                    callback({sides: [ sideX, sideY ], weight: config.WEIGHT})
                    hideAndResetPosition()
                }
            }
            base.moveTo(currentRoute[currentPosition].x, currentRoute[currentPosition].y, innerSpeed, onMoveCompleted)
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