import { log } from './utils'
import { Player} from './player'
import { PLAYER_TRACTOR, PLAYER_POSITION_DEFAULTS } from './playerConstants'

import uiService from './uiService'
import materials from './materials'
import objects, { OBJECTS } from './objects'
import { SIDE } from './commonConstants'

/*
 *  PLAYER SERVICE 
 */

let player = null
let playerObject = null
let playerConfig = PLAYER_TRACTOR
let gMode = null
let side = SIDE.NEUTRAL

const init = ({screenOptions, gameMode}) => {
    playerObject = objects.get(OBJECTS.PLAYER)
    player = new Player(OBJECTS.PLAYER, playerObject)

    // subscribe to move
    uiService.subscribeToPlayerMovements({moveLeft, moveRight})
    // uiService.subscribeToPlayerMovements({moveTop, moveBottom})

    updateSettings({screenOptions, gameMode})

    log(`[playerService] initialized`)
}

const updateSettings = ({screenOptions, gameMode}) => {
    playerConfig = screenOptions.playerConfig || playerConfig
    gMode = gameMode

    // setup player scale and positioning
    playerObject.transform.scaleX = playerConfig.SCALE_X
    playerObject.transform.scaleY = playerConfig.SCALE_Y

    // playerObject.transform.x = PLAYER_POSITION_DEFAULTS.X_DEFAULT
    // playerObject.transform.y = gMode.allowDrop ? PLAYER_POSITION_DEFAULTS.Y_ONLY_X : PLAYER_POSITION_DEFAULTS.Y_DEFAULT 

    player.setMaterial(materials.get(playerConfig.MATERIAL))

    // log(`[playerService] settings updated`)
}

const getSides = () => [ side, SIDE.NEUTRAL ] // player.getSides()

const moveLeft = () => side = SIDE.LEFT // player.moveLeft()

const moveRight = () => side = SIDE.RIGHT // player.moveRight()

// const moveTop = () => {
//     if (gMode.allowDrop) return
//     player.moveTop()
// }

// const moveBottom = () => {
//     if (gMode.allowDrop) return
//     player.moveBottom()
// }

const playerService = {
    init,
    getSides,
    moveLeft,
    moveRight,
    // moveTop,
    // moveBottom,
    updateSettings
}

export default playerService