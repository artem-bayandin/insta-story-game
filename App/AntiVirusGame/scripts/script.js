const Time = require('Time')

import { log } from './logger'

import masks from './masks'
import viruses from './viruses'
import faces from './faces'
import texts from './texts'
import Game from './game'

const exitCallback = (virusesCount) => {
    log(`--- -- - game finised - -- - total score: ${virusesCount} viruses - -- ---`)
}

const startTheGame = () => {
    log(`- -- --- ---- ----- ------ ------- script started on ${new Date()} ------- ------ ----- ---- --- -- -`)

    const game = new Game(faces, masks, viruses, texts, exitCallback)
    game.play()
}

Promise.all([
    masks.init(10),
    viruses.init(),
    faces.init(),
    texts.init()
])
.then(Time.setTimeout(() => { startTheGame() }, 1000))