import { linearSamplerUp, linearSamplerDown, animateVisibility, animateLinearMove, timeDriver } from './utils'

/*
 *  GENERAL CREATORS
 */

export const createWithId = (id) => {
    const getId = () => id

    return {
        getId
    }
}

export const createWithCoordinates = (obj) => {
    const getCoordinates = () => [
        obj.transform.x.pinLastValue(),
        obj.transform.y.pinLastValue()
    ]

    return {
        getCoordinates
    }
}

export const createWithShowHide = (obj) => {
    let _isVisible = true

    const show = (speed, scaleX, scaleY) => {
        if (isVisible()) return
        animateVisibility(obj, timeDriver(speed), linearSamplerUp(scaleX), linearSamplerUp(scaleY || scaleX))
        setVisibility(true)
    }

    const hide = (speed, scaleX, scaleY) => {
        if (!isVisible()) return
        animateVisibility(obj, timeDriver(speed), linearSamplerDown(scaleX), linearSamplerDown(scaleY || scaleX))
        setVisibility(false)
    }

    const setVisibility = (value) => _isVisible = value

    const isVisible = () => _isVisible

    return {
        show,
        hide,
        setVisibility,
        isVisible
    }
}

export const createWithMove = (obj) => {
    const moveTo = (x, y, speed, onCompleted = null) => {
        let driver = timeDriver(speed)
        if (onCompleted && typeof(onCompleted) === 'function') {
            driver.onCompleted().subscribe(onCompleted)
        }
        animateLinearMove(obj, driver, { x, y })
    }

    return {
        moveTo
    }
}

/*
 *  TEXT CREATORS
 */

export const createTextScore = (obj) => {
    const setText = (text) => obj.text = text.toString()
    const clearText = () => obj.text = ''

    return {
        setText,
        clearText
    }
}

export const createTextWithPrefix = (obj, prefix) => {
    let base = createTextScore(obj)

    const setText = (text) => base.setText(`${prefix}: ${text}`)
    const clearToPrefix = () => base.setText(prefix)

    return {
        ...base,
        setText,
        clearToPrefix
    }
}

export const createTextWithPostfix = (obj, postfix) => {
    let base = createTextScore(obj)

    const setText = (text) => base.setText(`${text} ${postfix}`)
    const clearToPostfix = () => base.setText(postfix)

    return {
        ...base,
        setText,
        clearToPostfix
    }
}

export const createTextTimer = (obj) => {
    let base = createTextScore(obj)

    const setText = (text) => base.setText(((+text)/1000).toFixed(1).replace('.', ':'))

    return {
        ...base,
        setText
    }
}