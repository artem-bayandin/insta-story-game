import { subscribeToPatchPulse, sendScalarToPatch, findMe, setupUiElement, log } from './utils'
import { PATCHES, STATS_LINE_BG, LINES, STAT_TXT, OUT_OF_THE_SCREEN, AVOID_COLLECT_POSITION, FINAL_STATS_POSITION, TOPROW_ICON_COORDINATES } from './commonConstants'

import objects, { OBJECTS } from './objects'
import materials from './materials'

const setupElement = (id, config) => {
    const material = materials.get(config.MATERIAL)
    const obj = objects.get(id)
    setupUiElement(obj, config, material)
}

let options = null
let eggProbability = null

const init = ({UI, screenOptions, eggOptions}) => {
    options = screenOptions
    eggProbability = eggOptions.probability

    // TODO: I don't use it
    // const { playerCoordMaxLeft, playerCoordMaxRight, playerCoordMaxTop, playerCoordMaxBottom} = UI
    // if (playerCoordMaxLeft !== undefined) sendScalarToPatch(PATCHES.INPUTS.PLAYER_COORDS.MAX_LEFT, playerCoordMaxLeft)
    // if (playerCoordMaxRight !== undefined) sendScalarToPatch(PATCHES.INPUTS.PLAYER_COORDS.MAX_RIGHT, playerCoordMaxRight)
    // if (playerCoordMaxTop !== undefined) sendScalarToPatch(PATCHES.INPUTS.PLAYER_COORDS.MAX_TOP, playerCoordMaxTop)
    // if (playerCoordMaxBottom !== undefined) sendScalarToPatch(PATCHES.INPUTS.PLAYER_COORDS.MAX_BOTTOM, playerCoordMaxBottom)

    return Promise.all([
          setupElement(OBJECTS.ICON_STATS_LINE_BG, STATS_LINE_BG)
        , setupElement(OBJECTS.LINE_LEFT_TOP, LINES.LEFT_TOP)
        , setupElement(OBJECTS.LINE_RIGHT_TOP, LINES.RIGHT_TOP)
        , setupElement(OBJECTS.LINE_LEFT_BOTTOM, LINES.LEFT_BOTTOM)
        , setupElement(OBJECTS.LINE_RIGHT_BOTTOM, LINES.RIGHT_BOTTOM)
        , setupElement(OBJECTS.TXT_TIMER, STAT_TXT.TIMER)
        , setupElement(OBJECTS.TXT_LEVEL, STAT_TXT.LEVEL)
        , setupElement(OBJECTS.TXT_EGGS, STAT_TXT.EGGS)
        , setupElement(OBJECTS.TXT_LIVES, STAT_TXT.LIVES)
    ]).then(() => log(`[uiService] initialized`))
}

const initTopRowIcons = () => {
    const { eggCounterIconConfig, liveCounterIconConfig, levelCounterIconConfig, stopwatchCounterIconConfig } = options
    return Promise.all([
        setupElement(OBJECTS.ICON_STOPWATCH, {...stopwatchCounterIconConfig, ...TOPROW_ICON_COORDINATES.STOPWATCH})
        , setupElement(OBJECTS.ICON_LEVEL, {...levelCounterIconConfig, ...TOPROW_ICON_COORDINATES.LEVEL})
        , setupElement(OBJECTS.ICON_EGG, {...eggCounterIconConfig, ...TOPROW_ICON_COORDINATES.EGG})
        , setupElement(OBJECTS.ICON_LIVES, {...liveCounterIconConfig, ...TOPROW_ICON_COORDINATES.LIVES})
    ])
}

const initAvoidCollect = () => {
    if (eggProbability.length == 3) setupElement(OBJECTS.ICON_LIVES, OUT_OF_THE_SCREEN.STAT_ICON)
    else if (eggProbability.length == 2) setupElement(OBJECTS.ICON_EGG, OUT_OF_THE_SCREEN.STAT_ICON)
    let killerEggs = eggProbability.filter(item => item[0].WEIGHT < 0)
    let healerEggs = eggProbability.filter(item => item[0].WEIGHT > 0)
    if (!killerEggs.length) {
        log('there should be at least 1 killer egg')
        return
    }
    if (eggProbability.length > 4) {
        if (!healerEggs.length) killerEggs.length = 4
        else if (healerEggs.length == 1) killerEggs.length = 3
        else if (healerEggs.length == 2) killerEggs.length = 2
        else {
            healerEggs.length = 2
            killerEggs.length = 2
        }
    }

    const iconArray = [ OBJECTS.ICON_STOPWATCH, OBJECTS.ICON_LEVEL, OBJECTS.ICON_EGG, OBJECTS.ICON_LIVES]

    const avoid = AVOID_COLLECT_POSITION.AVOID
    for (var i = 0; i < killerEggs.length; i++) {
        const currentEgg = killerEggs[i][0]
        let position = { X: avoid.START.X + avoid.STEP.X * i, Y: avoid.START.Y + avoid.STEP.Y }
        let config = { ...currentEgg.STAT_ICON, ...position, ...currentEgg.AC_ICON }
        setupElement(iconArray[i], config)
    }

    const collect = AVOID_COLLECT_POSITION.COLLECT
    for (var i = 0; i < healerEggs.length; i++) {
        const currentEgg = healerEggs[i][0]
        let position = { X: collect.START.X + collect.STEP.X * i, Y: collect.START.Y + collect.STEP.Y }
        let config = { ...currentEgg.STAT_ICON, ...position, ...currentEgg.AC_ICON }
        setupElement(iconArray[i + killerEggs.length], config)
    }
}

const subscribeToPlayerMovements = ({moveLeft = null, moveRight = null, moveTop = null, moveBottom = null}) => {
    if (moveLeft && typeof(moveLeft) === 'function') subscribeToPatchPulse(PATCHES.OUTPUTS.MOVE_PLAYER.LEFT, moveLeft)
    if (moveRight && typeof(moveRight) === 'function') subscribeToPatchPulse(PATCHES.OUTPUTS.MOVE_PLAYER.RIGHT, moveRight)
    if (moveTop && typeof(moveTop) === 'function') subscribeToPatchPulse(PATCHES.OUTPUTS.MOVE_PLAYER.TOP, moveTop)
    if (moveBottom && typeof(moveBottom) === 'function') subscribeToPatchPulse(PATCHES.OUTPUTS.MOVE_PLAYER.BOTTOM, moveBottom)
}

const moveToStats = () => {
    setupElement(OBJECTS.ICON_STOPWATCH, FINAL_STATS_POSITION.TIMER.ICON)
    setupElement(OBJECTS.ICON_LEVEL, FINAL_STATS_POSITION.LEVEL.ICON)
    setupElement(OBJECTS.ICON_EGG, FINAL_STATS_POSITION.EGGS.ICON)
    setupElement(OBJECTS.ICON_LIVES, FINAL_STATS_POSITION.LIVES.ICON)
}

const uiService = {
    init,
    subscribeToPlayerMovements,
    initTopRowIcons,
    initAvoidCollect,
    moveToStats
}

export default uiService