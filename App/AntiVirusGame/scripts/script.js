import { log, setTimeout } from './utils'

import energyService from './energyService'
import eggService from './eggService'
import playerService from './playerService'
import textService from './textService'
import Game from './game'

import { PLAYER_TRACTOR, PLAYER_FACE } from './playerConstants'

const startTheGame = () => {
    log(`- -- --- ---- ----- ------ ------- script started on ${new Date()} ------- ------ ----- ---- --- -- -`)
    const game = new Game(gameOptions)
    game.play()
}

const exitCallback = (eggsCount) => {
    log(`--- -- - game finised - -- - total score: ${eggsCount} eggs - -- ---`)
}

const gameOptions = {
    services: {
        playerService,
        energyService,
        eggService,
        textService,
    },
    exitCallback,
    gameSpeedOptions: {
        initialGameSpeed: 1350,
        gameSpeedStep: 150,
        maxGameSpeed: 500,
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
        txtEggsId: 'txtEggs',
        txtLivesId: 'txtLives',
        txtTimerId: 'txtTimer'
    }
}

Promise.all([
    energyService.init(gameOptions),
    eggService.init(),
    playerService.init(gameOptions),
    textService.init(gameOptions)
])
.then(setTimeout(() => { startTheGame() }, 1000))