import { subscribeToPatchPulse, sendScalarToPatch, findMe, setupUiElement, log } from './utils'
import { PATCHES, OBJECT_ID, STATS_LINE_BG, LINES, STAT_TXT, OUT_OF_THE_SCREEN, AVOID_COLLECT_POSITION } from './commonConstants'
import materialService from './materialService'

const setupElement = (id, config) => {
    const material = materialService.get(config.MATERIAL)
    findMe(id).then(item => setupUiElement(item, config, material))
}

let options = null
let eggProbability = null

const init = ({UI, screenOptions, eggOptions}) => {
    options = screenOptions
    eggProbability = eggOptions.probability

    const { playerCoordMaxLeft, playerCoordMaxRight, playerCoordMaxTop, playerCoordMaxBottom} = UI
    if (playerCoordMaxLeft !== undefined) sendScalarToPatch(PATCHES.INPUTS.PLAYER_COORDS.MAX_LEFT, playerCoordMaxLeft)
    if (playerCoordMaxRight !== undefined) sendScalarToPatch(PATCHES.INPUTS.PLAYER_COORDS.MAX_RIGHT, playerCoordMaxRight)
    if (playerCoordMaxTop !== undefined) sendScalarToPatch(PATCHES.INPUTS.PLAYER_COORDS.MAX_TOP, playerCoordMaxTop)
    if (playerCoordMaxBottom !== undefined) sendScalarToPatch(PATCHES.INPUTS.PLAYER_COORDS.MAX_BOTTOM, playerCoordMaxBottom)

    setupElement(OBJECT_ID.ICONS.STATS_LINE_BG, STATS_LINE_BG)

    setupElement(OBJECT_ID.LINES.LEFT_TOP, LINES.LEFT_TOP)
    setupElement(OBJECT_ID.LINES.RIGHT_TOP, LINES.RIGHT_TOP)
    setupElement(OBJECT_ID.LINES.LEFT_BOTTOM, LINES.LEFT_BOTTOM)
    setupElement(OBJECT_ID.LINES.RIGHT_BOTTOM, LINES.RIGHT_BOTTOM)
    
    setupElement(OBJECT_ID.TXT.TIMER, STAT_TXT.TIMER)
    setupElement(OBJECT_ID.TXT.LEVEL, STAT_TXT.LEVEL)
    setupElement(OBJECT_ID.TXT.EGGS, STAT_TXT.EGGS)
    setupElement(OBJECT_ID.TXT.LIVES, STAT_TXT.LIVES)
}

const initTopRowIcons = () => {
        const { eggCounterIconConfig, liveCounterIconConfig, levelCounterIconConfig, stopwatchCounterIconConfig } = options
    setupElement(OBJECT_ID.ICONS.STOPWATCH, stopwatchCounterIconConfig)
    setupElement(OBJECT_ID.ICONS.LEVEL, levelCounterIconConfig)
    setupElement(OBJECT_ID.ICONS.EGG, eggCounterIconConfig)
    setupElement(OBJECT_ID.ICONS.LIVES, liveCounterIconConfig)
}

const initAvoidCollect = () => {
    if (eggProbability.length == 3) setupElement(OBJECT_ID.ICONS.LIVES, OUT_OF_THE_SCREEN.STAT_ICON)
    else if (eggProbability.length == 2) setupElement(OBJECT_ID.ICONS.EGG, OUT_OF_THE_SCREEN.STAT_ICON)
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

    const iconArray = [ OBJECT_ID.ICONS.STOPWATCH, OBJECT_ID.ICONS.LEVEL, OBJECT_ID.ICONS.EGG, OBJECT_ID.ICONS.LIVES]

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

const uiService = {
    init,
    subscribeToPlayerMovements,
    initTopRowIcons,
    initAvoidCollect
}

export default uiService