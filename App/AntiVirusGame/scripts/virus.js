const Scene = require('Scene')

import { log } from './logger'

const Virus = (id, virus) => {

    const step = () => {
        log(`virus ${id} moved`)
    }

    return {
        step
    }
}

const initVirus = (identifier) => {
    return new Promise((res, rej) => {
        Scene.root.findFirst(identifier)
            .then(item => {
                log(`${identifier}: ${!!item}`)
                const virus = new Virus(identifier, item)
                res(virus)
            })
    })
}

export default initVirus