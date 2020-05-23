const Scene = require('Scene')
const Animation = require('Animation')
const Materials = require('Materials')

export const findMe = identifier => {
    return new Promise((res, rej) => {
        Scene.root.findFirst(identifier).then(item => { res(item) })
    })
}

export const findMaterial = identifier => {
    return new Promise((res, rej) => {
        Materials.findFirst(identifier).then(mat => { res(mat) })
    })
}

/*
 * NEXT CODE SHOULD BE REVIEWED AND REFACTORED
 */

export const animateVisibility = (obj, driver, samplerX, samplerY) => {
    obj.transform.scaleX = Animation.animate(driver, samplerX)
    obj.transform.scaleY = Animation.animate(driver, samplerY)
    driver.start()
}

export const animateLinearMove = (obj, driver, to) => {
    const currentX = obj.transform.x.pinLastValue()
    const currentY = obj.transform.y.pinLastValue()
    obj.transform.x = Animation.animate(driver, linearSamplerFromTo(currentX, to.x))
    obj.transform.y = Animation.animate(driver, linearSamplerFromTo(currentY, to.y))
    driver.start()
}

export const linearSamplerUp = scale => linearSamplerFromTo(0, scale)

export const linearSamplerDown = scale => linearSamplerFromTo(scale, 0)

export const linearSamplerFromTo = (from, to) => Animation.samplers.linear(from, to)