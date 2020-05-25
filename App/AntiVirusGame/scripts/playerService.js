import { log, findMe, animateMove, timeDriver, MOVE_TYPES } from './utils'
import { Player} from './player'
import { PLAYER_TRACTOR, PLAYER_FACE, LEFT_SIDE_X, RIGHT_SIDE_X, POSITION_TRANSITION_SPEED } from './playerConstants'
import materialService from './materialService'

/*
 *  PLAYER SERVICE 
 */

let player = null
let playerConfig = PLAYER_TRACTOR

log(`TODO: refactor to avoid this line`)
let playerObject = null

const init = ({playerServiceOptions}) => {
    const {type, identifier} = playerServiceOptions
    switch (type) {
        case PLAYER_FACE.ID:
            playerConfig = PLAYER_FACE
            break
        case PLAYER_TRACTOR.ID:
            playerConfig = PLAYER_TRACTOR
            break
        default:
            playerConfig = PLAYER_TRACTOR
            break
    }

    var promise1 = new Promise((res, rej) => {
        findMe(identifier)
            .then(item => {
                // TODO: refactor this call of material service or prove that player material will always exist here
                log('TODO: refactor this call of material service or prove that player material will always exist here')
                item.material = materialService.get(playerConfig.MATERIAL)
                item.transform.scaleX = playerConfig.SCALE_X
                item.transform.scaleY = playerConfig.SCALE_Y
                playerObject = item
                player = new Player(identifier, item)
                res(player)
            })
    })

    return Promise.all([promise1])
}

// return -1 if on the left, 1 if on the right, 0 if undefined state
const getSides = () => {
    const [ x, y ] = player.getCoordinates()
    log(`face coords: ${x}:${y}`)
    const sideX = x >= playerConfig.POSITION_DETECTOR.RIGHT ? 1 : x <= playerConfig.POSITION_DETECTOR.LEFT ? -1 : 0
    const sideY = y >= playerConfig.POSITION_DETECTOR.TOP ? 1 : y <= playerConfig.POSITION_DETECTOR.BOTTOM ? -1 : 0
    return [ sideX, sideY ]
}

// const movePlayerObject = (side) => {
//     log(`TODO: refactor to avoid this direct call to object`)
//     if (side < 0) {
//         // move left
//         log(`MOVING ${playerConfig.ID} TO THE LEFT`)
//         findMe(playerConfig.ID).then(item => {
//             log(`player was found, will be moved now...`)
//             animateMove(item, timeDriver(POSITION_TRANSITION_SPEED), { x: LEFT_SIDE_X })
//         })
//     }
//     if (side > 0) {
//         // move right
//         log(`MOVING ${playerConfig.ID} TO THE RIGHT`)
//         findMe(playerConfig.ID).then(item => {
//             log(`player was found, will be moved now...`)
//             animateMove(item, timeDriver(POSITION_TRANSITION_SPEED), { x: RIGHT_SIDE_X })
//         })
//     }
// }

const movePlayerObject = (side) => {
    log(`TODO: refactor to avoid this direct call to object`)
    if (side < 0) {
        // move left
        animateMove(playerObject, timeDriver(POSITION_TRANSITION_SPEED), { x: LEFT_SIDE_X }, MOVE_TYPES.EASE_IN_QUART)
    }
    if (side > 0) {
        // move right
        animateMove(playerObject, timeDriver(POSITION_TRANSITION_SPEED), { x: RIGHT_SIDE_X }, MOVE_TYPES.EASE_IN_QUART)
    }
}

const playerService = {
    init,
    getSides,
    movePlayerObject
}

export default playerService