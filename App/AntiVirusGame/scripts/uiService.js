import { subscribeToPatchPulse, sendScalarToPatch, findMe, setupUiElement, log } from './utils'
import { PATCHES, OBJECT_ID, STATS_LINE_BG, LINES, STAT_TXT } from './commonConstants'
import materialService from './materialService'

const setupElement = (id, config) => {
    const material = materialService.get(config.MATERIAL)
    findMe(id).then(item => setupUiElement(item, config, material))
}

const init = ({UI, screenOptions}) => {
    const { eggCounterIconConfig, liveCounterIconConfig, levelCounterIconConfig, stopwatchCounterIconConfig } = screenOptions

    const { playerCoordMaxLeft, playerCoordMaxRight, playerCoordMaxTop, playerCoordMaxBottom} = UI
    if (playerCoordMaxLeft !== undefined) sendScalarToPatch(PATCHES.INPUTS.PLAYER_COORDS.MAX_LEFT, playerCoordMaxLeft)
    if (playerCoordMaxRight !== undefined) sendScalarToPatch(PATCHES.INPUTS.PLAYER_COORDS.MAX_RIGHT, playerCoordMaxRight)
    if (playerCoordMaxTop !== undefined) sendScalarToPatch(PATCHES.INPUTS.PLAYER_COORDS.MAX_TOP, playerCoordMaxTop)
    if (playerCoordMaxBottom !== undefined) sendScalarToPatch(PATCHES.INPUTS.PLAYER_COORDS.MAX_BOTTOM, playerCoordMaxBottom)

    setupElement(OBJECT_ID.ICONS.STOPWATCH, stopwatchCounterIconConfig)
    setupElement(OBJECT_ID.ICONS.LEVEL, levelCounterIconConfig)
    setupElement(OBJECT_ID.ICONS.EGG, eggCounterIconConfig)
    setupElement(OBJECT_ID.ICONS.LIVES, liveCounterIconConfig)
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

const subscribeToPlayerMovements = ({moveLeft = null, moveRight = null, moveTop = null, moveBottom = null}) => {
    if (moveLeft && typeof(moveLeft) === 'function') subscribeToPatchPulse(PATCHES.OUTPUTS.MOVE_PLAYER.LEFT, moveLeft)
    if (moveRight && typeof(moveRight) === 'function') subscribeToPatchPulse(PATCHES.OUTPUTS.MOVE_PLAYER.RIGHT, moveRight)
    if (moveTop && typeof(moveTop) === 'function') subscribeToPatchPulse(PATCHES.OUTPUTS.MOVE_PLAYER.TOP, moveTop)
    if (moveBottom && typeof(moveBottom) === 'function') subscribeToPatchPulse(PATCHES.OUTPUTS.MOVE_PLAYER.BOTTOM, moveBottom)
}

const uiService = {
    init,
    subscribeToPlayerMovements
}

export default uiService