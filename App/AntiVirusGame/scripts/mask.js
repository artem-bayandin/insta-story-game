const Scene = require('Scene')

import { log } from './logger'

const Mask = (id, mask) => {
    let _isVisible = true

    const show = () => {
        _isVisible = true
        log(`${id} is shown, visilibity: ${_isVisible}`)
    }
    
    const hide = () => {
        _isVisible = false
        log(`${id} is hidden, visibility: ${_isVisible}`)
    }

    const isVisible = () => _isVisible

    return {
        id,
        show,
        hide,
        isVisible
    }
}

const initMask = (identifier) => {
    return new Promise((res, rej) => {
        Scene.root.findFirst(identifier)
            .then(item => {
                log(`${identifier}: ${!!item}`)
                const mask = new Mask(identifier, item)
                res(mask)
            })
    })
}

export default initMask