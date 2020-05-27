import { log, findMe, animateMove, timeDriver, MOVE_TYPES, subscribeToPatchPulse } from './utils'
import { Player} from './player'
import { PLAYER_TRACTOR, PLAYER_POSITION_DEFAULTS } from './playerConstants'
import materialService from './materialService'
import { SIDE } from './commonConstants'
import uiBinderService from './uiBinderService'

const timeDriverMove = () => timeDriver(PLAYER_POSITION_DEFAULTS.TRANSITION_SPEED)
const moveType = MOVE_TYPES.EASE_OUT_BACK

/*
 *  PLAYER SERVICE 
 */

let player = null
let playerConfig = PLAYER_TRACTOR

const init = ({playerServiceOptions, dropSettings}) => {
    const { identifier } = playerServiceOptions
    const { allowDrop } = dropSettings
    playerConfig = playerServiceOptions.playerConfig || playerConfig

    var promise1 = new Promise((res, rej) => {
        findMe(identifier)
            .then(item => {
                // TODO: refactor this call of material service or prove that player material will always exist here
                log('TODO: refactor this call of material service or prove that player material will always exist here')
                item.material = materialService.get(playerConfig.MATERIAL)

                // setup player scale and positioning
                item.transform.scaleX = playerConfig.SCALE_X
                item.transform.scaleY = playerConfig.SCALE_Y

                item.transform.x = PLAYER_POSITION_DEFAULTS.X_DEFAULT
                item.transform.y = allowDrop ? PLAYER_POSITION_DEFAULTS.Y_ONLY_X : PLAYER_POSITION_DEFAULTS.Y_DEFAULT 

                player = new Player(identifier, item)

                // subscribe to move
                uiBinderService.subscribeToPlayerMovements({moveLeft, moveRight})
                if (!allowDrop) {
                    uiBinderService.subscribeToPlayerMovements({moveTop, moveBottom})
                }
                res(player)
            })
    })

    return Promise.all([promise1])
}

// return -1 if on the left, 1 if on the right, 0 if undefined state
const getSides = () => {
    const [ x, y ] = player.getCoordinates()
    const sideX = x >= playerConfig.POSITION_DETECTOR.RIGHT ? SIDE.RIGHT : x <= playerConfig.POSITION_DETECTOR.LEFT ? SIDE.LEFT : SIDE.NEUTRAL
    const sideY = y >= playerConfig.POSITION_DETECTOR.TOP ? SIDE.TOP : y <= playerConfig.POSITION_DETECTOR.BOTTOM ? SIDE.BOTTOM : SIDE.NEUTRAL
    return [ sideX, sideY ]
}

const moveLeft = () => animateMove(player.getObj(), timeDriverMove(), { x: PLAYER_POSITION_DEFAULTS.X_LEFT }, moveType)

const moveRight = () => animateMove(player.getObj(), timeDriverMove(), { x: PLAYER_POSITION_DEFAULTS.X_RIGHT }, moveType)

const moveTop = () => animateMove(player.getObj(), timeDriverMove(), { y: PLAYER_POSITION_DEFAULTS.Y_TOP }, moveType)

const moveBottom = () => animateMove(player.getObj(), timeDriverMove(), { y: PLAYER_POSITION_DEFAULTS.Y_BOTTOM }, moveType)


const playerService = {
    init,
    getSides,
    moveLeft,
    moveRight,
    moveTop,
    moveBottom
}

export default playerService