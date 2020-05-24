import { log, setTimeout, MOVE_TYPES } from './utils'
import { createWithId, createWithCoordinates, createWithShowHide, createWithMove } from './inheritance'
import { EGG_COORDINATES, EGG_VIRUSRED_RIGHT } from './eggConstants'
import materialService from './materialService'

const fastAnimationSpeed = 10

/*
 *  EGG ENTITY
 */

export const Egg = (id, obj) => {
    let routes = null
    let currentPosition = -1
    let config = EGG_VIRUSRED_RIGHT

    const start = ({position, objectConfig}) => {
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

    const step = (speed, eggDroppedCallback) => {
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
                log(`egg '${id}' is on the edge!`)
                currentPosition++
                let onDroppedCompleted = () => {
                    base.hide()
                    currentPosition = -1
                }
                base.moveTo(routes[routes.length - 1].x, routes[routes.length - 1].y, dropSpeed, onDroppedCompleted)
                
                let side = routes[currentPosition].x < 0 ? -1 : 1
                setTimeout(() => {
                    eggDroppedCallback({side, weight: config.WEIGHT})
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
        ...createWithMove(obj, MOVE_TYPES.EASE_OUT_CUBIC),
        start,
        step
    }

    return base
}