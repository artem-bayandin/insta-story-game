const Scene = require('Scene')
const Animation = require('Animation')

import { log } from './logger'

const maskScale = 500

const Mask = (id, mask) => {

    //set up the length of the animations, 1000 = 1 second
    var driver = Animation.timeDriver({durationMilliseconds: 200});
    //define the starting and ending values (start at 0, go to 100)
    var samplerShow = Animation.samplers.linear(0, maskScale);
    var samplerHide = Animation.samplers.linear(maskScale, 0); 

    let _isVisible = true

    const show = () => {
        if (_isVisible) {
            return
        }

        //create an animation signal to control the object x position
        mask.transform.scaleX = Animation.animate(driver, samplerShow);
        mask.transform.scaleY = Animation.animate(driver, samplerShow);
        //start the animation
        driver.start();

        _isVisible = true
        log(`${id} is shown, visilibity: ${_isVisible}`)
    }
    
    const hide = () => {
        if (!_isVisible) {
            return
        }

        //create an animation signal to control the object x position
        mask.transform.scaleX = Animation.animate(driver, samplerHide);
        mask.transform.scaleY = Animation.animate(driver, samplerHide);
        //start the animation
        driver.start(); 

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