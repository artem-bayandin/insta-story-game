import { linearSamplerFromTo, animateScale, animateMove, timeDriver, MOVE_TYPES, log, setScale, setPosition } from './utils'

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

export const setMaterial = (obj) => {
    let materialName = ''

    const setMaterial = (material) => {
        if (materialName !== material.name) {
            obj.material = material
            materialName = material.name
        }
    }

    return {
        setMaterial
    }
}

export const createBase = (id, obj) => {
    return {
        ...createWithId(id),
        ...createWithCoordinates(obj),
        ...createWithObject(obj),
        ...setMaterial(obj)
    }
}

export const createWithShowHide = (obj, speed = 0, scaleX = 0, scaleY = 0) => {
    let _isVisible = true
    let _speed = speed
    let _scaleX = scaleX
    let _scaleY = scaleY

    const show = ({speed = 0, scaleX = 0, scaleY = 0} = {speed: 0, scaleX: 0, scaleY: 0}) => {
        setScale(obj, scaleX || _scaleX, scaleY || _scaleY)
        setVisibility(true)
    }

    const hide = ({speed = 1} = {speed: 1}) => {
        setScale(obj, 0, 0)
        setVisibility(false)
    }

    const setVisibility = (value) => obj.visible = value // _isVisible = value

    const isVisible = () => obj.visible // _isVisible

    return {
        show,
        hide,
        setVisibility,
        isVisible
    }
}

export const createWithMove = (obj, type = MOVE_TYPES.LINEAR, maxDelay = 0) => {
    const moveTo = (x, y, speed = 0, onCompleted = null) => {
        if (speed) {
            let driver = timeDriver(speed)
            if (onCompleted && typeof(onCompleted) === 'function') {
                driver.onCompleted().subscribe(onCompleted)
            }
            animateMove(obj, driver, { x, y }, type)
        } else {
            setPosition(obj, x, y)
            if (onCompleted && typeof(onCompleted) === 'function') {
                onCompleted()
            }
        }
    }

    return {
        moveTo
    }
}

/*
 *  TEXT CREATORS
 */

export const createTextScore = (obj) => {
    let currentText = ''
    obj.text = currentText

    const setTextWithValidation = (text) => {
        if (currentText != text) {
            obj.text = text
        }
    }

    const setText = (text) => setTextWithValidation(text)
    const clearText = () => setTextWithValidation('')

    return {
        setText,
        clearText
    }
}