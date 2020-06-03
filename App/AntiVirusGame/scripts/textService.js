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
    const txtLevelPromise = findMe(OBJECT_ID.TXT.LEVEL).then(item => txtLevel = new TxtScore(OBJECT_ID.TXT.LEVEL, item))
    const txtEggsPromise = findMe(OBJECT_ID.TXT.EGGS).then(item => txtEggs = new TxtScore(OBJECT_ID.TXT.EGGS, item))
    const txtLivesPromise = findMe(OBJECT_ID.TXT.LIVES).then(item => txtLives = new TxtScore(OBJECT_ID.TXT.LIVES, item))
    const txtTimerPromise = findMe(OBJECT_ID.TXT.TIMER).then(item => txtTimer = new TxtTimer(OBJECT_ID.TXT.TIMER, item))
    const txtInteractionPromise = findMe(OBJECT_ID.TXT.INTERACTION).then(item => {
        txtInteraction = new TxtScore(OBJECT_ID.TXT.INTERACTION, item)
        txtInteraction.moveTo(INTERACTION_POSITION.INITIAL.X, INTERACTION_POSITION.INITIAL.Y, INTERACTION_POSITION.SPEED)
    })

    return Promise
        .all([txtLevelPromise, txtEggsPromise, txtLivesPromise, txtTimerPromise, txtInteractionPromise])
        .then(() => log(`[textService] initialized`))
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
    // todo: what if avoid this somehow? switch to sending a signal to UI to start showing animation
    // if (+duration > 0) {
    //     setTimeout(() => {
    //         txtInteraction.clearText()
    //     }, duration)
    // }
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