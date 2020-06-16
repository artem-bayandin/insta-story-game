import { log, setTimeout, MOVE_TYPES } from './utils'
import { createWithShowHide, createWithMove, createBase } from './inheritance'
import { EGG_COORDINATES, EGG_VIRUS_RED } from './eggConstants'
import { SIDE } from './commonConstants'
import materials, { MATERIALS } from './materials'

const fastAnimationSpeed = 10

/*
 *  EGG ENTITY
 */

export const Egg = (id, obj) => {
    let currentRoute = null
    let currentSides = null
    let currentPosition = -1
    let config = EGG_VIRUS_RED(-1)
    let callback = null
    let gMode = null

    const start = ({ route, sides, eggCallback, objectConfig, newMaterial, gameMode }) => {
        callback = eggCallback
        gMode = gameMode

        config = objectConfig

        currentRoute = route
        currentSides = sides

        currentPosition = 0
        
        base.moveTo(currentRoute[0].x, currentRoute[0].y)
        base.setMaterial(materials.get(newMaterial))
        base.show({scaleX: config.SCALE_X, scaleY: config.SCALE_Y})
    }

    const step = (innerSpeed, dropSpeed) => {
        if (!base.isVisible()) return

        if (currentPosition >= 0 && currentPosition < 2) {
            currentPosition++
            base.moveTo(currentRoute[currentPosition].x, currentRoute[currentPosition].y, innerSpeed)
            return
        }
        
        if (currentPosition == 2) {
            // move to the end and drop
            currentPosition++

            let hideAndResetPosition = () => {
                base.hide()
                base.setMaterial(materials.get(MATERIALS.TRANSPARENT))

                // moved here to avoid setTimeout when dropping the egg
                callback({sides: [ currentSides.x, SIDE.NEUTRAL ], weight: config.WEIGHT})

                currentPosition = -1
            }

            let dropEgg = () => base.moveTo(currentRoute[currentRoute.length - 1].x, currentRoute[currentRoute.length - 1].y, dropSpeed, hideAndResetPosition)

            let onMoveCompleted = () => {
                if (gMode.allowDrop) {
                    dropEgg()
                    
                    // setTimeout(() => {
                    //     callback({sides: [ currentSides.x, SIDE.NEUTRAL ], weight: config.WEIGHT})
                    // }, dropSpeed - 100)
                } else {
                    // TODO: get face position
                    // if Face.Position == Egg.Position => callback
                    // else => dropEgg()
                    log(`TODO: get face position
                    if Face.Position == Egg.Position => callback
                    else => dropEgg()`)
                    callback({sides: [ currentSides.x, currentSides.y ], weight: config.WEIGHT})
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