import { log } from './logger'

import { BaseShowHide, findMe, linearSamplerUp, linearSamplerDown } from './base'

const maskScale = 500

const showHideSpeed = 10

class Mask extends BaseShowHide {
    constructor(id, mask) {
        super(id, mask, true) // mask.transform.scaleX > 10
    }

    show() {
        this.__show(showHideSpeed, linearSamplerUp(maskScale))
    }

    hide() {
        this.__hide(showHideSpeed, linearSamplerDown(maskScale))
    }
}

const initMask = (identifier) => {
    return new Promise((res, rej) => {
        findMe(identifier)
            .then(item => {
                log(`'${identifier}' mask found: ${!!item}`)
                const mask = new Mask(identifier, item)
                log(`'${identifier}' mask created: ${!!mask}`)  
                res(mask)
            })
    })
}

export default initMask