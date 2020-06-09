import { createBase } from './inheritance'
// import { log, animateMove, timeDriver, MOVE_TYPES } from './utils'
// import { PLAYER_POSITION_DEFAULTS, PLAYER_POSITION_DETECTOR } from './playerConstants'
// import { SIDE } from './commonConstants'

// const timeDriverMove = (onCompleted) => {
//     let driver = timeDriver(PLAYER_POSITION_DEFAULTS.TRANSITION_SPEED)
//     if (onCompleted && typeof(onCompleted) === 'function') driver.onCompleted().subscribe(onCompleted)
//     return driver
// }
// const moveType = MOVE_TYPES.EASE_OUT_BACK
/*
 *  PLAYER ENTITY
 */

export const Player = (id, obj) => {
    // let sideX = null
    // let sideY = null
    // let moving = false
    
    // const movedLeft = () => {
    //     moving = false
    //     sideX = SIDE.LEFT
    // }
    // const movedRight = () => {
    //     moving = false
    //     sideX = SIDE.RIGHT
    // }
    // const movedTop = () => {
    //     moving = false
    //     sideY = SIDE.TOP
    // }
    // const movedBottom = () => {
    //     moving = false
    //     sideY= SIDE.BOTTOM
    // }
    
    // const moveLeft = () => {
    //     if (sideX === SIDE.LEFT) return
    //     moving = true
    //     animateMove(obj, timeDriverMove(movedLeft), { x: PLAYER_POSITION_DEFAULTS.X_LEFT }, moveType)
    // }

    // const moveRight = () => {
    //     if (sideX === SIDE.RIGHT) return
    //     moving = true
    //     animateMove(obj, timeDriverMove(movedRight), { x: PLAYER_POSITION_DEFAULTS.X_RIGHT }, moveType)
    // }

    // const moveTop = () => {
    //     if (sideY === SIDE.TOP) return
    //     moving = true
    //     animateMove(obj, timeDriverMove(movedTop), { y: PLAYER_POSITION_DEFAULTS.Y_TOP }, moveType)
    // }

    // const moveBottom = () => {
    //     if (sideY === SIDE.BOTTOM) return
    //     moving = true
    //     animateMove(obj, timeDriverMove(movedBottom), { y: PLAYER_POSITION_DEFAULTS.Y_BOTTOM }, moveType)
    // }

    let base = {
        ...createBase(id, obj),
        // moveLeft,
        // moveRight,
        // moveTop,
        // moveBottom
    }

    // const getSides = () => {
    //     if (moving) {
    //         const [ x, y ] = base.getCoordinates()
    //         const sx = x >= PLAYER_POSITION_DETECTOR.RIGHT ? SIDE.RIGHT : x <= PLAYER_POSITION_DETECTOR.LEFT ? SIDE.LEFT : SIDE.NEUTRAL
    //         const sy = y >= PLAYER_POSITION_DETECTOR.TOP ? SIDE.TOP : y <= PLAYER_POSITION_DETECTOR.BOTTOM ? SIDE.BOTTOM : SIDE.NEUTRAL
    //         return [ sx, sy ]
    //     }
    //     else return [ sideX, sideY ]
    // }

    return {
        ...base,
        // getSides
    }
}