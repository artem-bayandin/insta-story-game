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
    let gMode = null

    const start = ({route, eggCallback, objectConfig, newMaterial, gameMode}) => {
        callback = eggCallback
        gMode = gameMode

        config = objectConfig
        obj.material = materialService.get(newMaterial)

        currentRoute = route
        currentPosition = 0
        base.moveTo(currentRoute[0].x, currentRoute[0].y, fastAnimationSpeed)

        base.show({scaleX: config.SCALE_X, scaleY: config.SCALE_Y})
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

            let dropEgg = () => base.moveTo(currentRoute[currentRoute.length - 1].x, currentRoute[currentRoute.length - 1].y, dropSpeed, hideAndResetPosition)

            let onMoveCompleted = () => {
                if (gMode.allowDrop) {
                    dropEgg()
                    
                    setTimeout(() => {
                        callback({sides: [ sideX, SIDE.NEUTRAL ], weight: config.WEIGHT, countDrop: config.COUNT_DROP})
                    }, dropSpeed / 2)
                } else {
                    // TODO: get face position
                    // if Face.Position == Egg.Position => callback
                    // else => dropEgg()
                    callback({sides: [ sideX, sideY ], weight: config.WEIGHT, countDrop: config.COUNT_DROP})
                    hideAndResetPosition()
                }
            }
            base.moveTo(currentRoute[currentPosition].x, currentRoute[currentPosition].y, innerSpeed, onMoveCompleted)
            return
        }
    }

    let base = {
        ...createBase(id, obj),
        ...createWithShowHide(obj, fastAnimationSpeed),
        ...createWithMove(obj, MOVE_TYPES.EASE_OUT_CUBIC),
        start,
        step
    }

    return base
}