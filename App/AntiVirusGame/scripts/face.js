const Scene = require('Scene')

import { log } from './logger'

const Face = (id, face) => {

    const hello = () => {
        log(`'Hello World' from ${id}`)
    }

    const getCoordinates = () => {
        let arr = []
        for (var p in face.transform) {
            arr.push({key: p, value: face.transform[p]})
        }

        let str = Object.keys(face.transform).join(' ')

        // face.transform.position.subscribeWithSnapshot((data) => {
        //     log(`SUBSCRIBED: ${JSON.stringify(data)}`)
        // })

        const transform = face.transform
        log(`Transform keys: ${Object.keys(transform).join(' ')}`)

        const signal = transform.toSignal()
        log(`Signal keys: ${Object.keys(signal).join(' ')}`)

        const signalHistory = signal.history
        log(`signalHistory keys: ${signalHistory.length} / ${Object.keys(signalHistory).join(' ')}`)

        log(`History: ${JSON.stringify(signalHistory)}`)

        const position = signal.position
        log(`Position keys: ${Object.keys(position).join(' ')}`)

        const positionHistory = position.history
        log(`positionHistory keys: ${positionHistory.length} / ${Object.keys(positionHistory).join(' ')}`)

        log(`History: ${JSON.stringify(positionHistory)}`)

        // const {x, y} = face.transform.toSignal().position
        // log(`face coords: ${x}:${y}`)
        // log(`face arr data: ${arr.length} items; str: ${str}; position: ${face.transform.position.x}:${face.transform.position.x}`)

        return [ 1, 1 ]
    }

    return {
        hello,
        getCoordinates
    }
}

const initFace = (identifier) => {
    return new Promise((res, rej) => {
        Scene.root.findFirst(identifier)
            .then(item => {
                log(`${identifier}: ${!!item}`)
                const face = new Face(identifier, item)
                res(face)
            })
    })
}

export default initFace