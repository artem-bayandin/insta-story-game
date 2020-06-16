import { log, setupUiElement } from './utils'
import { TxtScore } from './text'
import { INTERACTION_POSITION, FINAL_STATS_POSITION } from './commonConstants'
import objects, { OBJECTS } from './objects'

/*
 *  TEXT SERVICE 
 */

let txtTimer = null
let txtLevel = null
let txtEggs = null
let txtLives = null
let txtInteraction = null

const init = () => {
    txtLevel = new TxtScore(OBJECTS.TXT_LEVEL, objects.get(OBJECTS.TXT_LEVEL))
    txtEggs = new TxtScore(OBJECTS.TXT_EGGS, objects.get(OBJECTS.TXT_EGGS))
    txtLives = new TxtScore(OBJECTS.TXT_LIVES, objects.get(OBJECTS.TXT_LIVES))
    txtTimer = new TxtScore(OBJECTS.TXT_TIMER, objects.get(OBJECTS.TXT_TIMER))
    txtInteraction = new TxtScore(OBJECTS.TXT_INTERACTION, objects.get(OBJECTS.TXT_INTERACTION))
    log(`[textService] initialized`)
}

const setText = (level, eggsDropped, livesLeft) => {
    txtLevel.setText(level.toString())
    txtEggs.setText(eggsDropped.toString())
    txtLives.setText(livesLeft.toString())
}

const setTime = (ms) => {
    const sec = ms / 1000
    txtTimer.setText(sec.toString())
}

const setInteractionResult = (text) => {
    txtInteraction.setText(text)
}

const clearAll = (livesLeft = '') => {
    txtTimer.clearText()
    txtLevel.clearText()
    txtEggs.clearText()
    txtLives.setText(livesLeft)
    txtInteraction.clearText()
}

// const moveToStats = () => {
//     txtInteraction.moveTo(INTERACTION_POSITION.FINAL.X, INTERACTION_POSITION.FINAL.Y, INTERACTION_POSITION.SPEED)
//     setupUiElement(txtTimer.getObj(), FINAL_STATS_POSITION.TIMER.TEXT)
//     setupUiElement(txtLevel.getObj(), FINAL_STATS_POSITION.LEVEL.TEXT)
//     setupUiElement(txtEggs.getObj(), FINAL_STATS_POSITION.EGGS.TEXT)
//     setupUiElement(txtLives.getObj(), FINAL_STATS_POSITION.LIVES.TEXT)
// }

const textService = {
    init,
    setText,
    setTime,
    setInteractionResult,
    clearAll,
    // moveToStats
}

export default textService