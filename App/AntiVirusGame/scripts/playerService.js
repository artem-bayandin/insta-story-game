import { log } from './logger'
import { findMe, findMaterial } from './utils'
import { Player, PLAYER_TRACTOR, PLAYER_FACE } from './player'

/*
 *  PLAYER SERVICE 
 */

let player = null

const init = ({playerOptions}) => {
    const {type} = playerOptions

    var promise1 = new Promise((res, rej) => {
        const identifier = 'face'
        findMe(identifier)
            .then(item => {
                switch(type) {
                    case PLAYER_FACE.ID:
                        findMaterial(PLAYER_FACE.MATERIAL)
                            .then(mat => {
                                item.material = mat
                                item.transform.scaleX = PLAYER_FACE.SCALE_X
                                item.transform.scaleY = PLAYER_FACE.SCALE_Y
                                player = new Player(identifier, item)
                                res(player)
                            })
                        break
                    case PLAYER_TRACTOR.ID:
                        findMaterial(PLAYER_TRACTOR.MATERIAL)
                            .then(mat => {
                                item.material = mat
                                item.transform.scaleX = PLAYER_TRACTOR.SCALE_X
                                item.transform.scaleY = PLAYER_TRACTOR.SCALE_Y
                                player = new Player(identifier, item)
                                res(player)
                            })
                        break
                    default:
                        break
                }
            })
    })

    return Promise.all([promise1])
}

// return -1 if on the left, 1 if on the right, 0 if undefined state
const getSide = () => {
    const [ x, y ] = player.getCoordinates()
    log(`face coords: ${x}:${y}`)
    return x >= 40 ? 1 : x <= -40 ? -1 : 0
}

const playerService = {
    init,
    getSide,
}

export default playerService