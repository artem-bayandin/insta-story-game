import { findMe } from './utils'
import { TxtScore, TxtTimer } from './text'

/*
 *  TEXT SERVICE 
 */

let txtLevel = null
let txtViruses = null
let txtLives = null
let txtTimer = null

const init = () => {
    const txtLevelPromise = new Promise((res, rej) => {
        const id = 'txtLevel'
        findMe(id)
            .then(item => {
                txtLevel = new TxtScore(id, item)
                res(txtLevel)
            })
    })
    const txtVirusesPromise = new Promise((res, rej) => {
        const id = 'txtViruses'
        findMe(id)
            .then(item => {
                txtViruses = new TxtScore(id, item)
                res(txtViruses)
            })
    })
    const txtLivesPromise = new Promise((res, rej) => {
        const id = 'txtLives'
        findMe(id)
            .then(item => {
                txtLives = new TxtScore(id, item)
                res(txtLives)
            })
    })
    const txtTimerPromise = new Promise((res, rej) => {
        const id = 'txtTimer'
        findMe(id)
            .then(item => {
                txtTimer = new TxtTimer(id, item)
                res(txtTimer)
            })
    })

    return Promise.all([txtLevelPromise, txtVirusesPromise, txtLivesPromise, txtTimerPromise])
}

const setText = (level, virusesDropped, livesLeft) => {
    txtLevel.setText(level)
    txtViruses.setText(virusesDropped)
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