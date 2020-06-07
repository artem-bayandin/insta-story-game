import { subscribeToPatchPulse, sendScalarToPatch, setupUiElement, log, setMaterial } from './utils'
import { PATCHES, STATS_LINE_BG, LINES, STAT_TXT, OUT_OF_THE_SCREEN, AVOID_COLLECT_POSITION, FINAL_STATS_POSITION, TOPROW_ICON_COORDINATES } from './commonConstants'

import objects, { OBJECTS } from './objects'
import materials, { MATERIALS } from './materials'

const setupElement = (id, config) => {
    const material = materials.get(config.MATERIAL)
    const obj = objects.get(id)
    setupUiElement(obj, config, material)
}

let options = null
let eggProbability = null
const maxKillerEggs = 3
const maxHealerEggs = 3

const init = ({UI, screenOptions, eggOptions}) => {
    updateSettings({screenOptions, eggOptions})

    // TODO: I don't use it
    // const { playerCoordMaxLeft, playerCoordMaxRight, playerCoordMaxTop, playerCoordMaxBottom} = UI
    // if (playerCoordMaxLeft !== undefined) sendScalarToPatch(PATCHES.INPUTS.PLAYER_COORDS.MAX_LEFT, playerCoordMaxLeft)
    // if (playerCoordMaxRight !== undefined) sendScalarToPatch(PATCHES.INPUTS.PLAYER_COORDS.MAX_RIGHT, playerCoordMaxRight)
    // if (playerCoordMaxTop !== undefined) sendScalarToPatch(PATCHES.INPUTS.PLAYER_COORDS.MAX_TOP, playerCoordMaxTop)
    // if (playerCoordMaxBottom !== undefined) sendScalarToPatch(PATCHES.INPUTS.PLAYER_COORDS.MAX_BOTTOM, playerCoordMaxBottom)

    return Promise.all([
        // setupElement(OBJECTS.ICON_STATS_LINE_BG, STATS_LINE_BG),
        setupElement(OBJECTS.LINE_LEFT_TOP, LINES.LEFT_TOP),
        setupElement(OBJECTS.LINE_RIGHT_TOP, LINES.RIGHT_TOP),
        setupElement(OBJECTS.LINE_LEFT_BOTTOM, LINES.LEFT_BOTTOM),
        setupElement(OBJECTS.LINE_RIGHT_BOTTOM, LINES.RIGHT_BOTTOM),
        // setupElement(OBJECTS.TXT_TIMER, STAT_TXT.TIMER),
        // setupElement(OBJECTS.TXT_LEVEL, STAT_TXT.LEVEL),
        // setupElement(OBJECTS.TXT_EGGS, STAT_TXT.EGGS),
        // setupElement(OBJECTS.TXT_LIVES, STAT_TXT.LIVES),
        // setupElement(OBJECTS.TXT_TIMER, {MATERIAL: MATERIALS.TRANSPARENT}),
        // setupElement(OBJECTS.TXT_LEVEL, {MATERIAL: MATERIALS.TRANSPARENT}),
        // setupElement(OBJECTS.TXT_EGGS, {MATERIAL: MATERIALS.TRANSPARENT}),
        // setupElement(OBJECTS.TXT_LIVES, {MATERIAL: MATERIALS.TRANSPARENT}),
    ]).then(() => log(`[uiService] initialized`))
}

const updateSettings = ({screenOptions, eggOptions}) => {
    options = screenOptions
    eggProbability = eggOptions.probability

    // log(`[uiService] settings updated`)
}

const convertToNewScale = (config) => {
    return {
        SCALE_X: config.SCALE_X / 1000,
        SCALE_Y: config.SCALE_Y / 1000
    }
}

const initTopRowIcons = () => {
    const { eggCounterIconConfig, liveCounterIconConfig, levelCounterIconConfig, stopwatchCounterIconConfig } = options

    log(`NEW LIVE: ${OBJECTS.ICON_LIVES} :: ${JSON.stringify(convertToNewScale(liveCounterIconConfig))} :: ${!!materials.get(liveCounterIconConfig.MATERIAL)}`)

    return Promise.all([
        setupUiElement(objects.get(OBJECTS.ICON_STOPWATCH), convertToNewScale(stopwatchCounterIconConfig), materials.get(stopwatchCounterIconConfig.MATERIAL)),
        setupUiElement(objects.get(OBJECTS.ICON_LEVEL), convertToNewScale(levelCounterIconConfig), materials.get(levelCounterIconConfig.MATERIAL)),
        setupUiElement(objects.get(OBJECTS.ICON_EGG), convertToNewScale(eggCounterIconConfig), materials.get(eggCounterIconConfig.MATERIAL)),
        setupUiElement(objects.get(OBJECTS.ICON_LIVES), convertToNewScale(liveCounterIconConfig), materials.get(liveCounterIconConfig.MATERIAL)),
    ])
}

const initAvoidCollect = () => {
    let killerEggs = eggProbability.filter(item => item[0].WEIGHT < 0)
    let healerEggs = eggProbability.filter(item => item[0].WEIGHT > 0)
    if (!killerEggs.length) {
        log('there should be at least 1 killer egg')
        return
    }
    
    for (let i = 0; i < killerEggs.length && i < maxKillerEggs; i++) {
        let name = `avoid${i}`
        setupUiElement(objects.get(name), convertToNewScale(killerEggs[i][0].AC_ICON), materials.get(killerEggs[i][0].STAT_ICON.MATERIAL))
    }
    if (killerEggs.length < maxKillerEggs) {
        for (let i = killerEggs.length; i < maxKillerEggs; i++) {
            let name = `avoid${i}`
            setMaterial(objects.get(name), materials.get(MATERIALS.TRANSPARENT))
        }
    }

    for (let i = 0; i < healerEggs.length && i < maxHealerEggs; i++) {
        let name = `collect${i}`
        setupUiElement(objects.get(name), convertToNewScale(healerEggs[i][0].AC_ICON), materials.get(healerEggs[i][0].STAT_ICON.MATERIAL))
    }
    if (healerEggs.length < maxHealerEggs) {
        for (let i = healerEggs.length; i < maxHealerEggs; i++) {
            let name = `collect${i}`
            setMaterial(objects.get(name), materials.get(MATERIALS.TRANSPARENT))
        }
    }
}

const subscribeToPlayerMovements = ({moveLeft = null, moveRight = null, moveTop = null, moveBottom = null}) => {
    if (moveLeft && typeof(moveLeft) === 'function') subscribeToPatchPulse(PATCHES.OUTPUTS.MOVE_PLAYER.LEFT, moveLeft)
    if (moveRight && typeof(moveRight) === 'function') subscribeToPatchPulse(PATCHES.OUTPUTS.MOVE_PLAYER.RIGHT, moveRight)
    if (moveTop && typeof(moveTop) === 'function') subscribeToPatchPulse(PATCHES.OUTPUTS.MOVE_PLAYER.TOP, moveTop)
    if (moveBottom && typeof(moveBottom) === 'function') subscribeToPatchPulse(PATCHES.OUTPUTS.MOVE_PLAYER.BOTTOM, moveBottom)
}

// const moveToStats = () => {
//     setupElement(OBJECTS.ICON_STOPWATCH, FINAL_STATS_POSITION.TIMER.ICON)
//     setupElement(OBJECTS.ICON_LEVEL, FINAL_STATS_POSITION.LEVEL.ICON)
//     setupElement(OBJECTS.ICON_EGG, FINAL_STATS_POSITION.EGGS.ICON)
//     setupElement(OBJECTS.ICON_LIVES, FINAL_STATS_POSITION.LIVES.ICON)
// }

const uiService = {
    init,
    subscribeToPlayerMovements,
    initTopRowIcons,
    initAvoidCollect,
    // moveToStats,
    updateSettings
}

export default uiService