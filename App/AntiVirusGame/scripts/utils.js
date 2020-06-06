const Animation = require('Animation')
const Diagnostics = require('Diagnostics')
const Materials = require('Materials')
const NativeUI = require('NativeUI'); 
const Patches = require('Patches')
const Scene = require('Scene')
const Textures = require('Textures');
const Time = require('Time')
const TouchGestures = require('TouchGestures')

/*
 * DIAGNOSTICS
 */

export const log = (message) => Diagnostics.log(message)
export const watch = (tag, signal) => Diagnostics.watch(tag, signal)

/*
 * PATCH
 */

export const subscribeToPatchPulse = (identifier, func) => { return Patches.outputs.getPulse(identifier).then(pulse => pulse.subscribe(func)) }
export const subscribeToPatchBoolean = (identifier, func) => { return Patches.outputs.getBoolean(identifier).then(boolSignal => boolSignal.monitor({fireOnInitialValue: true}).subscribe(func)) }
export const sendScalarToPatch = (identifier, value) => Patches.inputs.setScalar(identifier, +value)
export const getScalar = (identifier) => new Promise((res,rej) => { Patches.outputs.getScalar(identifier).then(scalar => res(scalar)) })
export const setBooleanToPatch = (identifier, value) => Patches.inputs.setBoolean(identifier, !!value)

/*
 * RANDOMIZER
 */

export const randomInt = (min, max) => Math.floor(Math.random() * max) + min
export const randomFloat = (min, max) => Math.random() * max + min
export const randomItem = (arrayOfElements) => arrayOfElements[randomInt(1, arrayOfElements.length) - 1]

/*
 * SHOW / HIDE USING OBJECT PROPERTY SETTER
 */

// export const toggleVisible = (element, visible) => (element.visible = visible)
// export const hide = (element) => { if (element.visible) toggleVisible(element, false) }
// export const hideAll = (arrayOfElements) => { arrayOfElements.forEach(hide) }
// export const show = (element) => { if (!element.visible) toggleVisible(element, true) }
// export const showAll = (arrayOfElements) => { arrayOfElements.forEach(show) }

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
 * WRAPPERS
 */

export const findMe = (identifier) => Scene.root.findFirst(identifier)

export const findMaterial = (identifier) => Materials.findFirst(identifier)

export const findTexture = (identifier) => Textures.findFirst(identifier)

export const setMaterial = (element, material) => {
    if (material) {
        element.material = material
    }
}

export const setPosition = (element, x, y) => {
    if (x !== undefined && y !== undefined && x !== null && y !== null) {
        element.transform.x = x
        element.transform.y = y
    }
}

export const setScale = (element, scaleX, scaleY) => {
    if (scaleX !== undefined && scaleY !== undefined && scaleX !== null && scaleY !== null) {
        element.transform.scaleX = scaleX
        element.transform.scaleY = scaleY
    }
}

export const setupUiElement = (element, config, material = null) => {
    setMaterial(element, material)
    setScale(element, config.SCALE_X, config.SCALE_Y)
    setPosition(element, config.X, config.Y)
}

/*
 * NEXT CODE SHOULD BE REVIEWED AND REFACTORED
 */

export const MOVE_TYPES = {
    LINEAR: 'LINEAR',
    EASE_IN_QUART: 'EASE_IN_QUART',
    EASE_OUT_QUART: 'EASE_OUT_QUART',
    EASE_IN_CUBIC: 'EASE_IN_CUBIC',
    EASE_OUT_CUBIC: 'EASE_OUT_CUBIC',
    EASE_IN_BACK: 'EASE_IN_BACK',
    EASE_OUT_BACK: 'EASE_OUT_BACK',
}

export const animateScale = (obj, driver, samplerX, samplerY) => {
    if (!samplerY) {
        samplerY = samplerX
    }
    obj.transform.scaleX = Animation.animate(driver, samplerX)
    obj.transform.scaleY = Animation.animate(driver, samplerY)
    driver.start()
}

const samplerFabric = (type, from, to) => {
    switch (type) {
        case MOVE_TYPES.LINEAR:
            return linearSamplerFromTo(from, to)
        case MOVE_TYPES.EASE_IN_QUART:
            return easeInQuartSamplerFromTo(from, to)
        case MOVE_TYPES.EASE_OUT_QUART:
            return easeOutQuartSamplerFromTo(from, to)
        case MOVE_TYPES.EASE_IN_CUBIC:
            return easeInCubicSamplerFromTo(from, to)
        case MOVE_TYPES.EASE_OUT_CUBIC:
            return easeOutCubicSamplerFromTo(from, to)
        case MOVE_TYPES.EASE_IN_BACK:
            return easeInBackSamplerFromTo(from, to)
        case MOVE_TYPES.EASE_OUT_BACK:
            return easeOutBackSamplerFromTo(from, to)
        default:
            return linearSamplerFromTo(from, to)
    }
}

export const animateMove = (obj, driver, to, type = MOVE_TYPES.LINEAR) => {
    if(to.x !== undefined) {
        const currentX = obj.transform.x.pinLastValue()
        obj.transform.x = Animation.animate(driver, samplerFabric(type, currentX, to.x))
    }
    if(to.y !== undefined) {
        const currentY = obj.transform.y.pinLastValue()
        obj.transform.y = Animation.animate(driver, samplerFabric(type, currentY, to.y))
    }
    if(to.z !== undefined) {
        const currentZ = obj.transform.z.pinLastValue()
        obj.transform.z = Animation.animate(driver, samplerFabric(type, currentZ, to.z))
    }
    driver.start()
}

/* 
 * SAMPLERS
 */

export const linearSamplerFromTo = (from, to) => Animation.samplers.linear(from, to)

export const easeInQuartSamplerFromTo = (from, to) => Animation.samplers.easeInQuart(from, to)

export const easeOutQuartSamplerFromTo = (from, to) => Animation.samplers.easeOutQuart(from, to)

export const easeInCubicSamplerFromTo = (from, to) => Animation.samplers.easeInCubic(from, to)

export const easeOutCubicSamplerFromTo = (from, to) => Animation.samplers.easeOutCubic(from, to)

export const easeInBackSamplerFromTo = (from, to) => Animation.samplers.easeInBack(from, to)

export const easeOutBackSamplerFromTo = (from, to) => Animation.samplers.easeOutBack(from, to)

/*
 * DRIVERS
 */

export const timeDriver = (speed) => Animation.timeDriver({durationMilliseconds: speed})