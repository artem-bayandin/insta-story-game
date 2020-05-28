import { PATCHES } from './commonConstants'
import { log, getScalar } from './utils'

const settings = {
    x: 0,
    y: 0,
    scale: 0
}

const init = () => {
    return Promise.all([
        getScalar(PATCHES.OUTPUTS.DEVICE.SCREEN_SIZE.X).then(scalar => settings.x = scalar.pinLastValue()),
        getScalar(PATCHES.OUTPUTS.DEVICE.SCREEN_SIZE.Y).then(scalar => settings.y = scalar.pinLastValue()),
        getScalar(PATCHES.OUTPUTS.DEVICE.SCREEN_SCALE).then(scalar => settings.scale = scalar.pinLastValue())
    ])
}

const deviceService = {
    init,
    settings
}

export default deviceService