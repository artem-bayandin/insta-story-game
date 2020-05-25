import { log, setTimeout, findMe } from './utils'

import energyService from './energyService'
import eggService from './eggService'
import playerService from './playerService'
import textService from './textService'
import materialService from './materialService'
import gamepadService from './gamepadService'
import Game from './game'

import { PLAYER_TRACTOR, PLAYER_FACE } from './playerConstants'

const startTheGame = () => {
    log(`- -- --- ---- ----- ------ ------- script started on ${new Date()} ------- ------ ----- ---- --- -- -`)
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
        increaseWhenDropped: 10
    }
}

const game = new Game(gameOptions)

const servicesOptions = {
    ...gameOptions,
    energyServiceOptions: {
        initial: 7        
    },
    playerServiceOptions: {
        identifier: 'player',
        type: PLAYER_TRACTOR.ID
    },
    textServiceOptions: {
        txtLevelId: 'txtLevel',
        txtEggsId: 'txtEggs',
        txtLivesId: 'txtLives',
        txtTimerId: 'txtTimer'
    },
    gamepadServiceOptions: {
        togglePlay: () => game.togglePlay()
    }
}

Promise.all([
    energyService.init(servicesOptions),
    eggService.init(),
    playerService.init(servicesOptions),
    textService.init(servicesOptions),
    materialService.init(),
    gamepadService.init(servicesOptions),
])
.then(() => {
    // this line is left to easy test
    setTimeout(() => { startTheGame() }, 1000)

    findMe('game-canvas')
        .then(item => {
            const width = item.width.pinLastValue()
            const height = item.height.pinLastValue()
            log(`Game canvas = width: ${width}, height: ${height}`)
        })
        .catch(err => {
            log(`Error when looking for game-canvas: ${err}`)
        })
})