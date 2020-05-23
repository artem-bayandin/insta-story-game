import { log } from './logger'
import { findMe, findMaterial } from './utils'
import { Player, PLAYER_MATERIAL_TRACTOR, PLAYER_MATERIAL_FACE } from './player'

/*
 *  PLAYER SERVICE 
 */

let player = null

const init = (materialType) => {
    var promise1 = new Promise((res, rej) => {
        const identifier = 'face'
        findMe(identifier)
            .then(item => {
                switch(materialType) {
                    case PLAYER_MATERIAL_FACE:
                        findMaterial('face-2')
                            .then(mat => {
                                item.material = mat
                                item.transform.scaleX = 700
                                item.transform.scaleY = 750
                                player = new Player(identifier, item)
                                res(player)
                            })
                        break
                    case PLAYER_MATERIAL_TRACTOR:
                        findMaterial('belarus-1')
                            .then(mat => {
                                item.material = mat
                                item.transform.scaleX = 1000
                                item.transform.scaleY = 780
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