import { log } from './utils'
import { Player} from './player'
import { PLAYER_TRACTOR, PLAYER_POSITION_DEFAULTS } from './playerConstants'

import uiService from './uiService'
import materials from './materials'
import objects, { OBJECTS } from './objects'

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

const getSides = () => player.getSides()

const moveLeft = () => player.moveLeft()

const moveRight = () => player.moveRight()

const moveTop = () => player.moveTop()

const moveBottom = () => player.moveBottom()


const playerService = {
    init,
    getSides,
    moveLeft,
    moveRight,
    moveTop,
    moveBottom
}

export default playerService