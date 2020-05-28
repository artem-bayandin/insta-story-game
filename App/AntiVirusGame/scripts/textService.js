import { findMe } from './utils'
import { TxtScore, TxtTimer } from './text'
import { OBJECT_ID } from './commonConstants'

/*
 *  TEXT SERVICE 
 */

let txtLevel = null
let txtEggs = null
let txtLives = null
let txtTimer = null

const init = () => {
    const txtLevelPromise = new Promise((res, rej) => {
        const txtLevelId = OBJECT_ID.TXT.LEVEL
        findMe(txtLevelId).then(item => {
            txtLevel = new TxtScore(txtLevelId, item)
            res(txtLevel)
        })
    })
    const txtEggsPromise = new Promise((res, rej) => {
        const txtEggsId = OBJECT_ID.TXT.EGGS
        findMe(txtEggsId).then(item => {
            txtEggs = new TxtScore(txtEggsId, item)
            res(txtEggs)
        })
    })
    const txtLivesPromise = new Promise((res, rej) => {
        const txtLivesId = OBJECT_ID.TXT.LIVES
        findMe(txtLivesId).then(item => {
            txtLives = new TxtScore(txtLivesId, item)
            res(txtLives)
        })
    })
    const txtTimerPromise = new Promise((res, rej) => {
        const txtTimerId = OBJECT_ID.TXT.TIMER
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