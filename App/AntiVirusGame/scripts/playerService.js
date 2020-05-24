import { log } from './logger'
import { findMe, findMaterial } from './utils'
import { Player} from './player'
import { PLAYER_TRACTOR, PLAYER_FACE } from './playerConstants'

/*
 *  PLAYER SERVICE 
 */

let player = null
let playerConfig = null

const init = ({playerOptions}) => {
    const {type, identifier} = playerOptions
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
                findMaterial(playerConfig.MATERIAL)
                    .then(mat => {
                        item.material = mat
                        item.transform.scaleX = playerConfig.SCALE_X
                        item.transform.scaleY = playerConfig.SCALE_Y
                        player = new Player(identifier, item)
                        res(player)
                    })
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

const playerService = {
    init,
    getSides,
}

export default playerService