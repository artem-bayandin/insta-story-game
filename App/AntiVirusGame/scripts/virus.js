const Animation = require('Animation')
const Time = require('Time')

import { log } from './logger'
import { linearSamplerUp, linearSamplerDown, animateVisibility, animateLinearMove, timeDriver } from './utils'
import { createWithId, createWithCoordinates, createWithShowHide, createWithMove } from './inheritance'

const virusScaleX = 666
const virusScaleY = 623
const fastAnimationSpeed = 10

const dropLeft         = { x: -50, y: -180 }
const dropRight        = { x:  50, y: -180 }
const topLeftSteps     = [{ x: -155, y: 215 }, { x: -120, y: 200 }, { x: -85, y: 185 }, { x: -50, y: 170 }, dropLeft]
const bottomLeftSteps  = [{ x: -155, y:  65 }, { x: -120, y:  50 }, { x: -85, y:  35 }, { x: -50, y:  20 }, dropLeft]
const topRightSteps    = [{ x:  155, y: 215 }, { x:  120, y: 200 }, { x:  85, y: 185 }, { x:  50, y: 170 }, dropRight]
const bottomRightSteps = [{ x:  155, y:  65 }, { x:  120, y:  50 }, { x:  85, y:  35 }, { x:  50, y:  20 }, dropRight]
const routes = [ topLeftSteps, bottomLeftSteps, topRightSteps, bottomRightSteps ]

export const V = (id, obj) => {
    let base = {
        ...createWithCoordinates(obj),
        ...createWithId(id),
        ...createWithShowHide(obj),
        ...createWithMove(obj),
    }

    let routes = null
    let currentPosition = -1

    const start = (num) => {
        log(`VIRUS ${id} START`)
        routes = routes[num]
        currentPosition = 0
        base.moveTo(routes[0].x, routes[0].y, fastAnimationSpeed)
        base.show()
    }

    const step = (speed, virusDroppedCallback) => {
        const innerSpeed = speed / 2
        const dropSpeed = innerSpeed / 2

        if (!base.isVisible()) return

        log(`VIRUS ${id} STEP 2 visible: ${base.isVisible()}`)

        if (currentPosition >= 0 && currentPosition < 2) {
            log(`VIRUS ${id} STEP 3`)
            currentPosition++
            base.moveTo(routes[currentPosition].x, routes[currentPosition].y, innerSpeed)
            return
        }
        log(`VIRUS ${id} STEP 4 cp ${currentPosition}`)
        
        // if (currentPosition == 2) {
        //     // move to the end and drop
        //     currentPosition++
        //     var that = this
        //     let onMoveCompleted = () => {
        //         log(`virus '${that.id}' is on the edge!`)
        //         that.currentPosition++
        //         let onDroppedCompleted = () => {
        //             log(`virus '${that.base.id}' dopped!`)
        //             that.base.hide()
        //             that.currentPosition = -1
        //         }
        //         that.base.moveTo(that.routes[that.routes.length - 1].x, that.routes[that.routes.length - 1].y, dropSpeed, onDroppedCompleted)
                
        //         let side = routes[currentPosition].x < 0 ? -1 : 1
        //         Time.setTimeout(() => {
        //             virusDroppedCallback(side)
        //         }, dropSpeed / 2)
        //     }
        //     moveTo(routes[currentPosition].x, routes[currentPosition].y, innerSpeed, onMoveCompleted)
        //     return
        // }
    }

    return {
        ...base,
        start,
        step
    }
}

export class Virus {
    constructor(id, virus) {
        this.id = id
        this.virus = virus
        this._isVisible = true // virus.transform.scaleX > 10
        
        this.routes = null
        this.currentPosition = -1
    }

    // NOT NEEDED
    fastDriver() {
        return timeDriver(fastAnimationSpeed)
    }

    // MOVED
    show() {
        if (this._isVisible) return
        // log(`SHOW_virus '${this.id}': ${!!this.virus}`)
        animateVisibility(this.virus, this.fastDriver(), linearSamplerUp(virusScaleX), linearSamplerUp(virusScaleY))
        this._isVisible = true
    }

    // MOVED
    hide() {
        if (!this._isVisible) return
        // log(`HIDE_virus '${this.id}': ${!!this.virus}`)
        animateVisibility(this.virus, this.fastDriver(), linearSamplerDown(virusScaleX), linearSamplerDown(virusScaleY))
        this._isVisible = false
    }

    // MOVED
    setVisibility(value) { this._isVisible = value }

    // MOVED
    isVisible() { return this._isVisible }

    // MOVED
    getId() { return this.id }

    // SHOULD BE LEFT HERE
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

    // MOVED
    moveTo(x, y, speed, onCompleted) {
        let driver = timeDriver(speed)
        if (onCompleted) {
            driver.onCompleted().subscribe(onCompleted)
        }
        animateLinearMove(this.virus, driver, { x, y })
    }

    // SHOULD BE LEFT HERE
    start(num) {
        this.routes = routes[num]
        this.currentPosition = 0
        this.moveTo(this.routes[0].x, this.routes[0].y, fastAnimationSpeed)
        this.show()
    }
}