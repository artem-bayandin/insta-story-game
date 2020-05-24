import { log, findMe, registerTap } from './utils'
import playerService from './playerService'

let btnLeftTop = null
let btnRightTop = null
let btnLeftBottom = null
let btnRightBottom = null

const initButton = (identifier) => {
    return new Promise((res, rej) => findMe(identifier).then(item => res(item)))
}

const leftClick = (gesture) => playerService.movePlayerObject(-1)
const rightClick = (gesture) => playerService.movePlayerObject(1)

const init = () => {
    var promise1 = new Promise((res, rej) => initButton('btn-left-top').then(obj => res(btnLeftTop = obj)))
    var promise2 = new Promise((res, rej) => initButton('btn-right-top').then(obj => res(btnRightTop = obj)))
    var promise3 = new Promise((res, rej) => initButton('btn-left-bottom').then(obj => res(btnLeftBottom = obj)))
    var promise4 = new Promise((res, rej) => initButton('btn-right-bottom').then(obj => res(btnRightBottom = obj)))

    return Promise.all([
        promise1
        , promise2
        , promise3
        , promise4
    ]).then(() => {
        registerTap(btnLeftTop, leftClick)
        registerTap(btnRightTop, rightClick)
        registerTap(btnLeftBottom, leftClick)
        registerTap(btnRightBottom, rightClick)
    })
}

const gamepadService = {
    init
}

export default gamepadService