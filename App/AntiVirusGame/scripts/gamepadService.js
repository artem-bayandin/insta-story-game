// import { log, registerTap } from './utils'
// import { OBJECTS } from './objects'

// import playerService from './playerService'

// let btnLeftTop = null
// let btnRightTop = null
// let btnLeftBottom = null
// let btnRightBottom = null

// let btnPause = null

// const initButton = (identifier) => {
//     return new Promise((res, rej) => __findMe(identifier).then(item => res(item)))
// }

// const leftClick = (gesture) => playerService.movePlayerObject(-1)
// const rightClick = (gesture) => playerService.movePlayerObject(1)

// const init = ({gamepadServiceOptions}) => {
//     // const { togglePlay } = gamepadServiceOptions

//     // const promiseWithNoAction = new Promise((res, rej) => res("GamePad is currently removed from UI, but the logic left in code. Be careful when switching this logic on."))
//     // return promiseWithNoAction.then(() => log(`[gamepadService] initialized`))

//     // var promise1 = new Promise((res, rej) => initButton(OBJECTS.GAMEPAD_LEFT_TOP).then(obj => res(btnLeftTop = obj)))
//     // var promise2 = new Promise((res, rej) => initButton(OBJECTS.GAMEPAD_RIGHT_TOP).then(obj => res(btnRightTop = obj)))
//     // var promise3 = new Promise((res, rej) => initButton(OBJECTS.GAMEPAD_LEFT_BOTTOM).then(obj => res(btnLeftBottom = obj)))
//     // var promise4 = new Promise((res, rej) => initButton(OBJECTS.GAMEPAD_RIGHT_BOTTOM).then(obj => res(btnRightBottom = obj)))
//     // var promise5 = new Promise((res, rej) => initButton(OBJECTS.GAMEPAD_PAUSE).then(obj => res(btnPause = obj)))

//     // return Promise.all([
//     //     promise1
//     //     , promise2
//     //     , promise3
//     //     , promise4
//     //     , promise5
//     // ]).then(() => {
//     //     registerTap(btnLeftTop, leftClick)
//     //     registerTap(btnRightTop, rightClick)
//     //     registerTap(btnLeftBottom, leftClick)
//     //     registerTap(btnRightBottom, rightClick)
//     //     registerTap(btnPause, togglePlay)
//     // })
// }

// const gamepadService = {
//     init
// }

// export default gamepadService