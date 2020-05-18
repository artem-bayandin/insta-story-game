const Scene = require('Scene')

import { log } from './logger'

class Face {
    constructor(id, face) {
        this.id = id
        this.face = face
    }

    getCoordinates() {
        return [
            this.face.transform.x.pinLastValue(),
            this.face.transform.y.pinLastValue()
        ]
    }

    getId() {
        return this.id
    }
}

const initFace = (identifier) => {
    return new Promise((res, rej) => {
        Scene.root.findFirst(identifier)
            .then(item => {
                log(`'${identifier}' face found: ${!!item}`)
                const face = new Face(identifier, item)
                log(`'${identifier}' face created: ${!!face}`)
                res(face)
            })
    })
}

export default initFace