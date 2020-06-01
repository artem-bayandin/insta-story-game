import { findMe, log, setTimeout, setupUiElement } from './utils'
import { TxtScore, TxtTimer } from './text'
import { OBJECT_ID, INTERACTION_POSITION, FINAL_STATS_POSITION } from './commonConstants'

/*
 *  TEXT SERVICE 
 */

let txtTimer = null
let txtLevel = null
let txtEggs = null
let txtLives = null
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
            txtInteraction.moveTo(INTERACTION_POSITION.INITIAL.X, INTERACTION_POSITION.INITIAL.Y, INTERACTION_POSITION.SPEED)
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

const setInteractionResult = (text, duration = 0) => {
    txtInteraction.setText(text)
    if (duration && +duration > 0) {
        setTimeout(() => {
            txtInteraction.clearText()
        }, duration)
    }
}

const clearAll = () => {
    txtTimer.clearText()
    txtLevel.clearText()
    txtEggs.clearText()
    txtLives.clearText()
}

const moveToStats = () => {
    txtInteraction.moveTo(INTERACTION_POSITION.FINAL.X, INTERACTION_POSITION.FINAL.Y, INTERACTION_POSITION.SPEED)
    setupUiElement(txtTimer.getObj(), FINAL_STATS_POSITION.TIMER.TEXT)
    setupUiElement(txtLevel.getObj(), FINAL_STATS_POSITION.LEVEL.TEXT)
    setupUiElement(txtEggs.getObj(), FINAL_STATS_POSITION.EGGS.TEXT)
    setupUiElement(txtLives.getObj(), FINAL_STATS_POSITION.LIVES.TEXT)
}

const textService = {
    init,
    setText,
    setTime,
    setInteractionResult,
    clearAll,
    moveToStats
}

export default textService