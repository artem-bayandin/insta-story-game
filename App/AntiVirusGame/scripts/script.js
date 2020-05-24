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
        identifier: 'player',
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
    textService.init(gameOptions),
    materialService.init(),
    gamepadService.init(),
])
.then(() => {
    // this line is left to easy test
    setTimeout(() => { startTheGame() }, 100000)

    findMe('game-canvas')
        .then(item => {
            log(`Game canvas found`)
            for (var p in item) {
                log(`prop: ${p}`)
            }
            const width = item.width.pinLastValue()
            const height = item.height.pinLastValue()
            log(`width: ${width}`)
            log(`height: ${height}`)
            log(`Game canvas trace end`)
        })
        .catch(err => {
            log(`Error when looking for game-canvas: ${err}`)
        })
})