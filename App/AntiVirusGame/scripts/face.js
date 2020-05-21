import { log } from './logger'
import { Base, findMe } from './base'

class Face extends Base {
    constructor(id, face) {
        super(id, face)
    }
}

const initFace = (identifier) => {
    return new Promise((res, rej) => {
        findMe(identifier)
            .then(item => {
                // log(`'${identifier}' face found: ${!!item}`)
                const face = new Face(identifier, item)
                // log(`'${identifier}' face created: ${!!face}`)
                res(face)
            })
    })
}

export default initFace