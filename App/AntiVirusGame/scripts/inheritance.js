import { linearSamplerFromTo, animateVisibility, animateMove, timeDriver, MOVE_TYPES, randomInt, setTimeout } from './utils'

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

export const createBase = (id, obj) => {
    return {
        ...createWithId(id),
        ...createWithCoordinates(obj)
    }
}

export const createWithShowHide = (obj, speed, scaleX, scaleY) => {
    let _isVisible = true

    // TODO: refactor to pass { speed, scaleX, scaleY } params
    const show = () => {
        if (isVisible()) return
        animateVisibility(obj, timeDriver(speed), linearSamplerFromTo(0, scaleX), linearSamplerFromTo(0, scaleY || scaleX))
        setVisibility(true)
    }

    // TODO: refactor to pass { speed, scaleX, scaleY } params
    const hide = () => {
        if (!isVisible()) return
        animateVisibility(obj, timeDriver(speed), linearSamplerFromTo(scaleX, 0), linearSamplerFromTo(scaleY || scaleX, 0))
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

export const createWithMove = (obj, type = MOVE_TYPES.LINEAR, maxDelay = 0) => {
    // const minDelay = 33 // TODO: well, not a good UX

    const moveTo = (x, y, speed, onCompleted = null) => {
        let driver = timeDriver(speed)
        if (onCompleted && typeof(onCompleted) === 'function') {
            driver.onCompleted().subscribe(onCompleted)
        }
        // const delay = maxDelay >= minDelay ? randomInt(minDelay, maxDelay) : 0
        // setTimeout(() => animateMove(obj, driver, { x, y }, type), delay)
        animateMove(obj, driver, { x, y }, type)
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