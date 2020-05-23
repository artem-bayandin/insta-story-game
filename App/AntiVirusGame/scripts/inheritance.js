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