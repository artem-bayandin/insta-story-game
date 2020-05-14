const Diagnostics = require('Diagnostics')

export const log = (message) => Diagnostics.log(message)

const logger = {
    log
}

export default logger