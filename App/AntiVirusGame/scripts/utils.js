const Animation = require('Animation')
const Diagnostics = require('Diagnostics')
const Materials = require('Materials')
const Scene = require('Scene')
const Time = require('Time')
const TouchGestures = require('TouchGestures')

/*
 * DIAGNOSTICS
 */

export const log = (message) => Diagnostics.log(message)
export const watch = (tag, signal) => Diagnostics.watch(tag, signal)

/*
 * RANDOMIZER
 */

export const randomInt = (min, max) => Math.floor(Math.random() * max) + min
export const randomFloat = (min, max) => Math.random() * max + min
export const randomItem = (arrayOfElements) => arrayOfElements[randomInt(0, arrayOfElements.length - 1)]

/*
 * SHOW / HIDE USING OBJECT PROPERTY SETTER
 */

export const toggleHidden = (element, isHidden) => (element.hidden = isHidden)
export const hide = (element) => { if (!element.hidden) toggleHidden(element, true) }
export const hideAll = (arrayOfElements) => { arrayOfElements.forEach(hide) }
export const show = (element) => { if (element.hidden) toggleHidden(element, false) }
export const showAll = (arrayOfElements) => { arrayOfElements.forEach(show) }

/*
 * TEXT
 */

export const setText = (element, text) => element.text = text
export const clearText = (element) => setText(element, '')

/*
 * TIMER
 */

export const setTimeout = (func, timeout) => Time.setTimeout(func, timeout)
export const setInterval = (func, interval) => { return Time.setInterval(func, interval) }
export const clearInterval = (func) => Time.clearInterval(func)

/*
 * TAP
 */

export const registerTap = (element, func) => { return TouchGestures.onTap(element).subscribe(func) }
export const unregisterTap = (tapSubscription) => tapSubscription.unsubscribe()

/*
 * ANIMTAION UTILS
 */

export const findMe = identifier => {
    return new Promise((res, rej) => Scene.root.findFirst(identifier).then(item => { res(item) }))
}

export const findMaterial = identifier => {
    return new Promise((res, rej) => Materials.findFirst(identifier).then(mat => { res(mat) }))
}

/*
 * NEXT CODE SHOULD BE REVIEWED AND REFACTORED
 */

export const animateVisibility = (obj, driver, samplerX, samplerY) => {
    if (!samplerY) {
        samplerY = samplerX
    }
    obj.transform.scaleX = Animation.animate(driver, samplerX)
    obj.transform.scaleY = Animation.animate(driver, samplerY)
    driver.start()
}

export const animateLinearMove = (obj, driver, to) => {
    if(typeof(to.x) !== 'undefined') {
        const currentX = obj.transform.x.pinLastValue()
        obj.transform.x = Animation.animate(driver, linearSamplerFromTo(currentX, to.x))
    }
    if(typeof(to.y) !== 'undefined') {
        const currentY = obj.transform.y.pinLastValue()
        obj.transform.y = Animation.animate(driver, linearSamplerFromTo(currentY, to.y))
    }
    if(typeof(to.z) !== 'undefined') {
        const currentZ = obj.transform.z.pinLastValue()
        obj.transform.z = Animation.animate(driver, linearSamplerFromTo(currentZ, to.z))
    }
    driver.start()
}

export const linearSamplerUp = scale => linearSamplerFromTo(0, scale)

export const linearSamplerDown = scale => linearSamplerFromTo(scale, 0)

export const linearSamplerFromTo = (from, to) => Animation.samplers.linear(from, to)

export const timeDriver = (speed) => Animation.timeDriver({durationMilliseconds: speed})