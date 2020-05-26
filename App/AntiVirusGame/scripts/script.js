import { log, setTimeout, findMe } from './utils'

import energyService from './energyService'
import eggService from './eggService'
import playerService from './playerService'
import textService from './textService'
import materialService from './materialService'
import gamepadService from './gamepadService'
import Game from './game'

import { PLAYER_TRACTOR, PLAYER_FACE } from './playerConstants'
import { EGG_VIRUS_BLUE, EGG_VIRUS_RED } from './eggConstants'

const startTheGame = () => {
    log(`- -- --- ---- ----- ------ ------- script started on ${new Date()} ------- ------ ----- ---- --- -- -`)
    game.play()
}

const exitCallback = ({eggs, time}) => {
    log(`--- -- - game finised - -- - total score: ${eggs} eggs, time: ${((+time)/1000).toFixed(1)} seconds - -- ---`)
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
    },
    dropSettings: {
        allowDrop: true
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
        type: PLAYER_TRACTOR.ID,
        allowY: false
    },
    textServiceOptions: {
        txtLevelId: 'txtLevel',
        txtEggsId: 'txtEggs',
        txtLivesId: 'txtLives',
        txtTimerId: 'txtTimer'
    },
    gamepadServiceOptions: {
        togglePlay: () => game.togglePlay()
    },
    eggServiceOptions: {
        eggProbabilityArray: [EGG_VIRUS_RED, EGG_VIRUS_BLUE]
    }
}

Promise.all([
    energyService.init(servicesOptions),
    eggService.init(servicesOptions),
    playerService.init(servicesOptions),
    textService.init(servicesOptions),
    materialService.init(servicesOptions),
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