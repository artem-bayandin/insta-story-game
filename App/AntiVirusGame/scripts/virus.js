const Scene = require('Scene')
const Animation = require('Animation')
const Time = require('Time')

import { log } from './logger'

const virusScaleX = 666
const virusScaleY = 623
const fastAnimationSpeed = 10
// const slowAnimationSpeed = 333

const samplerShow = (scale) => Animation.samplers.linear(0, scale)
const samplerHide = (scale) => Animation.samplers.linear(scale, 0) 

const animateVisibility = (virus, driver, samplerX, samplerY) => {
    if (!samplerY) {
        samplerY = samplerX
    }
    //create an animation signal to control the object x position
    virus.transform.scaleX = Animation.animate(driver, samplerX)
    virus.transform.scaleY = Animation.animate(driver, samplerY)

    //start the animation
    driver.start()
}

const animateMove = (mask, driver, to) => {
    //create an animation signal to control the object x position
    const currentX = mask.transform.x.pinLastValue()
    const currentY = mask.transform.y.pinLastValue()
    mask.transform.x = Animation.animate(driver, Animation.samplers.linear(currentX, to.x))
    mask.transform.y = Animation.animate(driver, Animation.samplers.linear(currentY, to.y))

    //start the animation
    driver.start()
}

const dropLeft         = { x: -50, y: -180 }
const dropRight        = { x:  50, y: -180 }
const topLeftSteps     = [{ x: -155, y: 215 }, { x: -120, y: 200 }, { x: -85, y: 185 }, { x: -50, y: 170 }, dropLeft]
const bottomLeftSteps  = [{ x: -155, y:  65 }, { x: -120, y:  50 }, { x: -85, y:  35 }, { x: -50, y:  20 }, dropLeft]
const topRightSteps    = [{ x:  155, y: 215 }, { x:  120, y: 200 }, { x:  85, y: 185 }, { x:  50, y: 170 }, dropRight]
const bottomRightSteps = [{ x:  155, y:  65 }, { x:  120, y:  50 }, { x:  85, y:  35 }, { x:  50, y:  20 }, dropRight]
const routes = [ topLeftSteps, bottomLeftSteps, topRightSteps, bottomRightSteps ]

class Virus {
    constructor(id, virus) {
        this.id = id
        this.virus = virus
        this._isVisible = true // virus.transform.scaleX > 10
        
        this.routes = null
        this.currentPosition = -1
    }

    fastDriver() {
        return this.driver(fastAnimationSpeed)
    }

    // slowDriver() {
    //     return this.driver(slowAnimationSpeed)
    // }

    driver(speed) {
        return Animation.timeDriver({durationMilliseconds: speed})
    }

    show() {
        if (this._isVisible) return
        // log(`SHOW_virus '${this.id}': ${!!this.virus}`)
        animateVisibility(this.virus, this.fastDriver(), samplerShow(virusScaleX), samplerShow(virusScaleY))
        this._isVisible = true
    }

    hide() {
        if (!this._isVisible) return
        // log(`HIDE_virus '${this.id}': ${!!this.virus}`)
        animateVisibility(this.virus, this.fastDriver(), samplerHide(virusScaleX), samplerHide(virusScaleY))
        this._isVisible = false
    }

    setVisibility(value) { this._isVisible = value }

    isVisible() { return this._isVisible }

    getId() { return this.id }

    step(speed, virusDroppedCallback) {
        const innerSpeed = speed / 2
        const dropSpeed = innerSpeed / 2

        if (!this._isVisible) {
            // virusDroppedCallback(0)
            // return [ 0 ]
            return
        }

        if (this.currentPosition >= 0 && this.currentPosition < 2) {
            this.currentPosition++
            this.moveTo(this.routes[this.currentPosition].x, this.routes[this.currentPosition].y, innerSpeed)
            // virusDroppedCallback(0)
            // return [ 0 ]
            return
        } else if (this.currentPosition == 2) {
            // move to the end and drop
            this.currentPosition++
            var that = this
            let onMoveCompleted = () => {
                log(`virus '${that.id}' is on the edge!`)
                that.currentPosition++
                let onDroppedCompleted = () => {
                    log(`virus '${that.id}' dopped!`)
                    that.hide()
                    that.currentPosition = -1
                }
                that.moveTo(that.routes[that.routes.length - 1].x, that.routes[that.routes.length - 1].y, dropSpeed, onDroppedCompleted)
                
                let side = this.routes[this.currentPosition].x < 0 ? -1 : 1
                Time.setTimeout(() => {
                    virusDroppedCallback(side)
                }, dropSpeed / 2)
            }
            this.moveTo(this.routes[this.currentPosition].x, this.routes[this.currentPosition].y, innerSpeed, onMoveCompleted)

            // return [ this.routes[this.currentPosition].x < 0 ? -1 : 1, innerSpeed + dropSpeed ]
            return
        }
    }

    moveTo(x, y, speed, onCompleted) {
        let driver = this.driver(speed)
        if (onCompleted) {
            driver.onCompleted().subscribe(onCompleted)
        }
        animateMove(this.virus, driver, { x, y })
    }

    start(num) {
        this.routes = routes[num]
        this.currentPosition = 0
        this.moveTo(this.routes[0].x, this.routes[0].y, fastAnimationSpeed)
        this.show()
    }
}

const initVirus = (identifier) => {
    return new Promise((res, rej) => {
        Scene.root.findFirst(identifier)
            .then(item => {
                // log(`'${identifier}' virus found: ${!!item}`)
                const virus = new Virus(identifier, item)
                // log(`'${identifier}' virus created: ${!!virus}`)
                res(virus)
            })
    })
}

export default initVirus