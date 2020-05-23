const Time = require('Time')

import { log } from './logger'

import energyService from './energyService'
import virusService from './virusService'
import playerService from './playerService'
import textService from './textService'
import Game from './game'

import { PLAYER_TRACTOR, PLAYER_FACE } from './player'

const startTheGame = () => {
    log(`- -- --- ---- ----- ------ ------- script started on ${new Date()} ------- ------ ----- ---- --- -- -`)
    const game = new Game(gameOptions)
    game.play()
}

const exitCallback = (virusesCount) => {
    log(`--- -- - game finised - -- - total score: ${virusesCount} viruses - -- ---`)
}

const gameOptions = {
    services: {
        playerService,
        energyService,
        virusService,
        textService,
    },
    exitCallback,
    gameSpeedOptions: {
        initialGameSpeed: 1300,
        gameSpeedStep: 150,
        maxGameSpeed: 450,
        initialStageCapacity: 6
    },
    energyOptions: {
        initial: 7,
        increaseWhenDropped: 10
    },
    playerOptions: {
        identifier: 'face',
        type: PLAYER_TRACTOR.ID
    },
    textServiceOptions: {
        txtLevelId: 'txtLevel',
        txtVirusesId: 'txtViruses',
        txtLivesId: 'txtLives',
        txtTimerId: 'txtTimer'
    }
}

Promise.all([
    energyService.init(gameOptions),
    virusService.init(),
    playerService.init(gameOptions),
    textService.init(gameOptions)
])
.then(Time.setTimeout(() => { startTheGame() }, 1000))