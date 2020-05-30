import { findMe, log, setTimeout, setBooleanToPatch } from './utils'
import { TxtScore, TxtTimer } from './text'
import { OBJECT_ID, PATCHES } from './commonConstants'

/*
 *  TEXT SERVICE 
 */

let txtLevel = null
let txtEggs = null
let txtLives = null
let txtTimer = null
let txtInteraction = null

const init = () => {
    const txtLevelPromise = new Promise((res, rej) => {
        const id = OBJECT_ID.TXT.LEVEL
        findMe(id).then(item => {
            txtLevel = new TxtScore(id, item)
            res(txtLevel)
        })
    })
    const txtEggsPromise = new Promise((res, rej) => {
        const id = OBJECT_ID.TXT.EGGS
        findMe(id).then(item => {
            txtEggs = new TxtScore(id, item)
            res(txtEggs)
        })
    })
    const txtLivesPromise = new Promise((res, rej) => {
        const id = OBJECT_ID.TXT.LIVES
        findMe(id).then(item => {
            txtLives = new TxtScore(id, item)
            res(txtLives)
        })
    })
    const txtTimerPromise = new Promise((res, rej) => {
        const id = OBJECT_ID.TXT.TIMER
        findMe(id).then(item => {
            txtTimer = new TxtTimer(id, item)
            res(txtTimer)
        })
    })
    const txtInteractionPromise = new Promise((res, rej) => {
        const id = OBJECT_ID.TXT.INTERACTION
        findMe(id).then(item => {
            txtInteraction = new TxtScore(id, item)
            res(txtInteraction)
        })
    })

    return Promise.all([txtLevelPromise, txtEggsPromise, txtLivesPromise, txtTimerPromise, txtInteractionPromise])
}

const setText = (level, eggsDropped, livesLeft) => {
    txtLevel.setText(level)
    txtEggs.setText(eggsDropped)
    txtLives.setText(livesLeft)
}

const setTime = (ms) => {
    txtTimer.setText(ms)
}

const setInteractionResult = (text, duration) => {
    txtInteraction.setText(text)
    txtInteraction.color = "green"
    setBooleanToPatch(PATCHES.INPUTS.INTERACTION_VISIBLE, true)
    setTimeout(() => {
        txtInteraction.clearText()
        setBooleanToPatch(PATCHES.INPUTS.INTERACTION_VISIBLE, false)
    }, duration)
}

const textService = {
    init,
    setText,
    setTime,
    setInteractionResult
}

export default textService