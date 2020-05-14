import { log } from './logger'
import initMask from './mask'

let rightMask = null
let centerMask = null
let leftMask = null

const init = () => {
    var m1promise = initMask('mask1')
            .then(obj => {
                rightMask = obj
                log(`rightMask: ${rightMask.id}`)
            })
    var m2promise = initMask('mask2')
            .then(obj => {
                centerMask = obj
                log(`centerMask: ${centerMask.id}`)
            })
    var m3promise = initMask('mask3')
            .then(obj => {
                leftMask = obj
                log(`leftMask: ${leftMask.id}`)
            })

    return Promise
    .all([
        m1promise,
        m2promise,
        m3promise
    ])
}

const addMask = () => {
    if (!rightMask.isVisible()) {
        log('...showing right mask')
        rightMask.show()
    } else if (!centerMask.isVisible()) {
        log('...showing center mask')
        centerMask.show()
    } else if (!leftMask.isVisible()) {
        log('...showing left mask')
        leftMask.show()
    }
    log(`visibility ${leftMask.id}:${leftMask.isVisible()} ${centerMask.id}:${centerMask.isVisible()} ${rightMask.id}:${rightMask.isVisible()}`)
    if (leftMask.isVisible()) {
        log('100% health')
    }
}

const removeMask = () => {
    if (leftMask.isVisible()) {
        log('...hide left mask')
        leftMask.hide()
    } else if (centerMask.isVisible()) {
        log('...hide center mask')
        centerMask.hide()
    } else if (rightMask.isVisible()) {
        log('...hide right mask')
        rightMask.hide()
    }
    log(`visibility ${leftMask.id}:${leftMask.isVisible()} ${centerMask.id}:${centerMask.isVisible()} ${rightMask.id}:${rightMask.isVisible()}`)
    if (!rightMask.isVisible()) {
        log('you died...(')
    }
    // return this to understand if you died or not
    return rightMask.isVisible()
}

const masks = {
    addMask,
    removeMask,
    init
}

export default masks