import { linearSamplerFromTo, animateScale, animateMove, timeDriver, MOVE_TYPES, randomInt, setTimeout, log } from './utils'

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

export const createWithObject = (obj) => {
    const getObj = () => obj

    return {
        getObj
    }
}

export const createBase = (id, obj) => {
    return {
        ...createWithId(id),
        ...createWithCoordinates(obj),
        ...createWithObject(obj)
    }
}

export const createWithShowHide = (obj, speed = 0, scaleX = 0, scaleY = 0) => {
    let _isVisible = true
    let _speed = speed
    let _scaleX = scaleX
    let _scaleY = scaleY

    const show = ({speed = 0, scaleX = 0, scaleY = 0} = {speed: 0, scaleX: 0, scaleY: 0}) => {
        const [ s, x, y ] = [ speed || _speed, scaleX || _scaleX, scaleY || _scaleY ]
        if (isVisible() || !(s > 0 && x > 0 && y > 0)) return
        animateScale(obj
            , timeDriver(s)
            , linearSamplerFromTo(0, x)
            , linearSamplerFromTo(0, y)
        )
        setVisibility(true)
    }

    const hide = ({speed = 1} = {speed: 1}) => {
        const s = speed || _speed
        if (!isVisible()) return
        animateScale(obj
            , timeDriver(s)
            , linearSamplerFromTo(obj.transform.scaleX.pinLastValue(), 0)
            , linearSamplerFromTo(obj.transform.scaleY.pinLastValue(), 0)
        )
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
    const moveTo = (x, y, speed, onCompleted = null) => {
        let driver = timeDriver(speed)
        if (onCompleted && typeof(onCompleted) === 'function') {
            driver.onCompleted().subscribe(onCompleted)
        }
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

    // const setText = (text) => base.setText(((+text)/1000).toFixed(1).replace('.', ':'))
    const setText = (text) => base.setText(((+text)/1000).toFixed(0))

    return {
        ...base,
        setText
    }
}