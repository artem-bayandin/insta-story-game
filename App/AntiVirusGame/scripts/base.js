const Scene = require('Scene')
const Animation = require('Animation')

import { log } from './logger'

export const animateVisibility = (obj, driver, samplerX, samplerY) => {
    obj.transform.scaleX = Animation.animate(driver, samplerX)
    obj.transform.scaleY = Animation.animate(driver, samplerY)
    driver.start()
}

export const animateLinearMove = (obj, driver, to) => {
    const currentX = obj.transform.x.pinLastValue()
    const currentY = obj.transform.y.pinLastValue()
    obj.transform.x = Animation.animate(driver, Animation.samplers.linear(currentX, to.x))
    obj.transform.y = Animation.animate(driver, Animation.samplers.linear(currentY, to.y))
    driver.start()
}

export const linearSamplerUp = scale => Animation.samplers.linear(0, scale)

export const linearSamplerDown = scale => Animation.samplers.linear(scale, 0)

export const findMe = identifier => {
    return new Promise((res, rej) => {
        Scene.root.findFirst(identifier)
            .then(item => {
                res(item)
            })
    })
}

export class Base {
    constructor(id, obj) {
        this.id = id
        this.obj = obj
    }

    getCoordinates() {
        return [
            this.obj.transform.x.pinLastValue(),
            this.obj.transform.y.pinLastValue()
        ]
    }

    getId() {
        return this.id
    }
}

export class BaseShowHide extends Base {
    constructor(id, obj, isVisible) {
        super(id, obj)
        this.__isVisible = isVisible // mask.transform.scaleX > 10
    }

    __driver(speed) {
        return  Animation.timeDriver({durationMilliseconds: speed})
    }

    __show(speed, samplerX, samplerY) {
        if (!samplerY) {
            samplerY = samplerX
        }
        if (this.isVisible()) return
        log(`show '${this.id}'`)
        animateVisibility(this.obj, this.__driver(speed), samplerY, samplerX)
        this.setVisibility(true)
    }

    __hide(speed, samplerX, samplerY) {
        if (!samplerY) {
            samplerY = samplerX
        }
        if (!this.isVisible()) return
        log(`hide '${this.id}'`)
        animateVisibility(this.obj, this.__driver(speed), samplerY, samplerX)
        this.setVisibility(false)
    }

    setVisibility(value) { this.__isVisible = value }

    isVisible() { return this.__isVisible }
}