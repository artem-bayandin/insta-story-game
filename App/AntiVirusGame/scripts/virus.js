import { log, setTimeout } from './utils'
import { createWithId, createWithCoordinates, createWithShowHide, createWithMove } from './inheritance'
import { VIRUS_COORDINATES, VIRUS_RED_RIGHT } from './virusConstants'

const fastAnimationSpeed = 10

export const Virus = (id, obj) => {
    let routes = null
    let currentPosition = -1
    let config = VIRUS_RED_RIGHT

    const start = ({position, objectConfig, material}) => {
        if (config.ID !== objectConfig.ID) {
            config = objectConfig
            obj.material = material
            obj.transform.scaleX = config.SCALE_X
            obj.transform.scaleY = config.SCALE_Y
        }

        routes = VIRUS_COORDINATES.GLOBAL_ROUTES[position]
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
                setTimeout(() => {
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