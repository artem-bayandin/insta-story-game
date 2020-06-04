import { log, findMe, animateMove, timeDriver, MOVE_TYPES } from './utils'
import { Player} from './player'
import { PLAYER_TRACTOR, PLAYER_POSITION_DEFAULTS, PLAYER_POSITION_DETECTOR } from './playerConstants'
import { SIDE } from './commonConstants'

import uiService from './uiService'
import materials from './materials'
import objects, { OBJECTS } from './objects'

const timeDriverMove = () => timeDriver(PLAYER_POSITION_DEFAULTS.TRANSITION_SPEED)
const moveType = MOVE_TYPES.EASE_OUT_BACK

/*
 *  PLAYER SERVICE 
 */

let player = null
let playerObject = null
let playerConfig = PLAYER_TRACTOR
let gMode = null

const init = ({screenOptions, gameMode}) => {
    playerConfig = screenOptions.playerConfig || playerConfig
    gMode = gameMode

    playerObject = objects.get(OBJECTS.PLAYER)

    playerObject.material = materials.get(playerConfig.MATERIAL)

    // setup player scale and positioning
    playerObject.transform.scaleX = playerConfig.SCALE_X
    playerObject.transform.scaleY = playerConfig.SCALE_Y

    playerObject.transform.x = PLAYER_POSITION_DEFAULTS.X_DEFAULT
    playerObject.transform.y = gMode.allowDrop ? PLAYER_POSITION_DEFAULTS.Y_ONLY_X : PLAYER_POSITION_DEFAULTS.Y_DEFAULT 

    player = new Player(OBJECTS.PLAYER, playerObject)

    // subscribe to move
    uiService.subscribeToPlayerMovements({moveLeft, moveRight})
    if (!gMode.allowDrop) {
        uiService.subscribeToPlayerMovements({moveTop, moveBottom})
    }

    log(`[playerService] initialized`)
}

// return -1 if on the left, 1 if on the right, 0 if undefined state
const getSides = () => {
    // TODO: refactor this so that Player return [sides]
    const [ x, y ] = player.getCoordinates()
    // todo: move to Player objects 
    const sideX = x >= PLAYER_POSITION_DETECTOR.RIGHT ? SIDE.RIGHT : x <= PLAYER_POSITION_DETECTOR.LEFT ? SIDE.LEFT : SIDE.NEUTRAL
    const sideY = y >= PLAYER_POSITION_DETECTOR.TOP ? SIDE.TOP : y <= PLAYER_POSITION_DETECTOR.BOTTOM ? SIDE.BOTTOM : SIDE.NEUTRAL
    return [ sideX, sideY ]
}

const moveLeft = () => animateMove(playerObject, timeDriverMove(), { x: PLAYER_POSITION_DEFAULTS.X_LEFT }, moveType)

const moveRight = () => animateMove(playerObject, timeDriverMove(), { x: PLAYER_POSITION_DEFAULTS.X_RIGHT }, moveType)

const moveTop = () => animateMove(playerObject, timeDriverMove(), { y: PLAYER_POSITION_DEFAULTS.Y_TOP }, moveType)

const moveBottom = () => animateMove(playerObject, timeDriverMove(), { y: PLAYER_POSITION_DEFAULTS.Y_BOTTOM }, moveType)


const playerService = {
    init,
    getSides,
    moveLeft,
    moveRight,
    moveTop,
    moveBottom
}

export default playerService