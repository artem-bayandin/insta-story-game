const Time = require('Time')

import { log } from './logger'

import energyService from './energyService'
import virusService from './virusService'
import playerService from './playerService'
import textService from './textService'
import Game from './game'

import { PLAYER_TRACTOR, PLAYER_FACE } from './player'

const exitCallback = (virusesCount) => {
    log(`--- -- - game finised - -- - total score: ${virusesCount} viruses - -- ---`)
}

const startTheGame = () => {
    log(`- -- --- ---- ----- ------ ------- script started on ${new Date()} ------- ------ ----- ---- --- -- -`)

    const game = new Game(playerService, energyService, virusService, textService, exitCallback)
    game.play()
}

Promise.all([
    energyService.init(7),
    virusService.init(),
    playerService.init(PLAYER_TRACTOR.ID),
    textService.init()
])
.then(Time.setTimeout(() => { startTheGame() }, 1000))