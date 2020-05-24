import { findMe } from './utils'
import { TxtScore, TxtTimer } from './text'

/*
 *  TEXT SERVICE 
 */

let txtLevel = null
let txtViruses = null
let txtLives = null
let txtTimer = null

const init = ({textServiceOptions}) => {
    const { txtLevelId, txtVirusesId, txtLivesId, txtTimerId } = textServiceOptions

    const txtLevelPromise = new Promise((res, rej) => {
        findMe(txtLevelId).then(item => {
            txtLevel = new TxtScore(txtLevelId, item)
            res(txtLevel)
        })
    })
    const txtVirusesPromise = new Promise((res, rej) => {
        findMe(txtVirusesId).then(item => {
            txtViruses = new TxtScore(txtVirusesId, item)
            res(txtViruses)
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