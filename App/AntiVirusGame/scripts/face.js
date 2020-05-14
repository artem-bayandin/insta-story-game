const Scene = require('Scene')

import { log } from './logger'

const Face = (id, face) => {

    const hello = () => {
        log(`'Hello World' from ${id}`)
    }

    return {
        hello
    }
}

const initFace = (identifier) => {
    return new Promise((res, rej) => {
        Scene.root.findFirst(identifier)
            .then(item => {
                log(`${identifier}: ${!!item}`)
                const face = new Face(identifier, item)
                res(face)
            })
    })
}

export default initFace