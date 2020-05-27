import { subscribeToPatchPulse, sendScalarToPatch } from './utils'

const init = ({UI}) => {
    const { playerCoordMaxLeft, playerCoordMaxRight, playerCoordMaxTop, playerCoordMaxBottom} = UI
    if (playerCoordMaxLeft !== undefined) sendScalarToPatch('playerCoordMaxLeft', playerCoordMaxLeft)
    if (playerCoordMaxRight !== undefined) sendScalarToPatch('playerCoordMaxRight', playerCoordMaxRight)
    if (playerCoordMaxTop !== undefined) sendScalarToPatch('playerCoordMaxTop', playerCoordMaxTop)
    if (playerCoordMaxBottom !== undefined) sendScalarToPatch('playerCoordMaxBottom', playerCoordMaxBottom)
}

const subscribeToPlayerMovements = ({moveLeft = null, moveRight = null, moveTop = null, moveBottom = null}) => {
    if (moveLeft && typeof(moveLeft) === 'function') subscribeToPatchPulse('movePlayerLeft', moveLeft)
    if (moveRight && typeof(moveRight) === 'function') subscribeToPatchPulse('movePlayerRight', moveRight)
    if (moveTop && typeof(moveTop) === 'function') subscribeToPatchPulse('movePlayerTop', moveTop)
    if (moveBottom && typeof(moveBottom) === 'function') subscribeToPatchPulse('movePlayerBottom', moveBottom)
}

const uiBinderService = {
    init,
    subscribeToPlayerMovements
}

export default uiBinderService