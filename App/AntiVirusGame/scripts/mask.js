const Scene = require('Scene')
const Animation = require('Animation')

import { log } from './logger'

const maskScale = 500

const samplerShow = Animation.samplers.linear(0, maskScale)
const samplerHide = Animation.samplers.linear(maskScale, 0)

const animateVisibility = (mask, driver, sampler) => {
    //create an animation signal to control the object x position
    mask.transform.scaleX = Animation.animate(driver, sampler)
    mask.transform.scaleY = Animation.animate(driver, sampler)

    //start the animation
    driver.start()
}

const visibilityDriver = Animation.timeDriver({durationMilliseconds: 10})

class Mask {
    constructor(id, mask) {
        this.id = id
        this.mask = mask
        this._isVisible = true // mask.transform.scaleX > 10
    }

    show() {
        if (this._isVisible) return
        log(`show '${this.id}'`)
        animateVisibility(this.mask, visibilityDriver, samplerShow)
        this._isVisible = true
    }

    hide() {
        if (!this._isVisible) return
        log(`hide '${this.id}'`)
        animateVisibility(this.mask, visibilityDriver, samplerHide)
        this._isVisible = false
    }

    setVisibility(value) { this._isVisible = value }

    isVisible() { return this._isVisible }

    getId() { return this.id }
}

const initMask = (identifier) => {
    return new Promise((res, rej) => {
        Scene.root.findFirst(identifier)
            .then(item => {
                log(`'${identifier}' mask found: ${!!item}`)
                const mask = new Mask(identifier, item)
                log(`'${identifier}' mask created: ${!!mask}`)
                res(mask)
            })
    })
}

export default initMask