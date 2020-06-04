import { findMe, log, setTimeout, setupUiElement } from './utils'
import { TxtScore, TxtTimer } from './text'
import { INTERACTION_POSITION, FINAL_STATS_POSITION } from './commonConstants'
import { OBJECTS } from './objects'

/*
 *  TEXT SERVICE 
 */

let txtTimer = null
let txtLevel = null
let txtEggs = null
let txtLives = null
let txtInteraction = null

const init = () => {
    const txtLevelPromise = findMe(OBJECTS.TXT_LEVEL).then(item => txtLevel = new TxtScore(OBJECTS.TXT_LEVEL, item))
    const txtEggsPromise = findMe(OBJECTS.TXT_EGGS).then(item => txtEggs = new TxtScore(OBJECTS.TXT_EGGS, item))
    const txtLivesPromise = findMe(OBJECTS.TXT_LIVES).then(item => txtLives = new TxtScore(OBJECTS.TXT_LIVES, item))
    const txtTimerPromise = findMe(OBJECTS.TXT_TIMER).then(item => txtTimer = new TxtTimer(OBJECTS.TXT_TIMER, item))
    const txtInteractionPromise = findMe(OBJECTS.TXT_INTERACTION).then(item => {
        txtInteraction = new TxtScore(OBJECTS.TXT_INTERACTION, item)
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