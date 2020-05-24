import { findMe } from './utils'
import { TxtScore, TxtTimer } from './text'

/*
 *  TEXT SERVICE 
 */

let txtLevel = null
let txtEggs = null
let txtLives = null
let txtTimer = null

const init = ({textServiceOptions}) => {
    const { txtLevelId, txtEggsId, txtLivesId, txtTimerId } = textServiceOptions

    const txtLevelPromise = new Promise((res, rej) => {
        findMe(txtLevelId).then(item => {
            txtLevel = new TxtScore(txtLevelId, item)
            res(txtLevel)
        })
    })
    const txtEggsPromise = new Promise((res, rej) => {
        findMe(txtEggsId).then(item => {
            txtEggs = new TxtScore(txtEggsId, item)
            res(txtEggs)
        })
    })
    const txtLivesPromise = new Promise((res, rej) => {
        findMe(txtLivesId).then(item => {
            txtLives = new TxtScore(txtLivesId, item)
            res(txtLives)
        })
    })
    const txtTimerPromise = new Promise((res, rej) => {
        findMe(txtTimerId).then(item => {
            txtTimer = new TxtTimer(txtTimerId, item)
            res(txtTimer)
        })
    })

    return Promise.all([txtLevelPromise, txtEggsPromise, txtLivesPromise, txtTimerPromise])
}

const setText = (level, eggsDropped, livesLeft) => {
    txtLevel.setText(level)
    txtEggs.setText(eggsDropped)
    txtLives.setText(livesLeft)
}

const setTime = (ms) => {
    txtTimer.setText(ms)
}

const textService = {
    init,
    setText,
    setTime
}

export default textService