const Time = require('Time')

import { log } from './logger'

import masks from './masks'
import viruses from './viruses'
import faces from './faces'
import texts from './texts'
import Game from './game'

import { FACE_MATERIAL_FACE, FACE_MATERIAL_TRACTOR } from './face'

const exitCallback = (virusesCount) => {
    log(`--- -- - game finised - -- - total score: ${virusesCount} viruses - -- ---`)
}

const startTheGame = () => {
    log(`- -- --- ---- ----- ------ ------- script started on ${new Date()} ------- ------ ----- ---- --- -- -`)

    const game = new Game(faces, masks, viruses, texts, exitCallback)
    game.play()
}

Promise.all([
    masks.init(7),
    viruses.init(),
    faces.init(FACE_MATERIAL_TRACTOR),
    texts.init()
])
.then(Time.setTimeout(() => { startTheGame() }, 1000))