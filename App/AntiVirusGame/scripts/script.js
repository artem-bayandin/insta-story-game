const Time = require('Time')

import { log } from './logger'

import energyService from './energyService'
import viruses from './viruses'
import playerService from './playerService'
import textService from './textService'
import Game from './game'

import { PLAYER_MATERIAL_TRACTOR, PLAYER_MATERIAL_FACE } from './player'

const exitCallback = (virusesCount) => {
    log(`--- -- - game finised - -- - total score: ${virusesCount} viruses - -- ---`)
}

const startTheGame = () => {
    log(`- -- --- ---- ----- ------ ------- script started on ${new Date()} ------- ------ ----- ---- --- -- -`)

    const game = new Game(playerService, energyService, viruses, textService, exitCallback)
    game.play()
}

Promise.all([
    energyService.init(7),
    viruses.init(),
    playerService.init(PLAYER_MATERIAL_TRACTOR),
    textService.init()
])
.then(Time.setTimeout(() => { startTheGame() }, 1000))