import { log, setTimeout, findMe } from './utils'

import energyService from './energyService'
import eggService from './eggService'
import playerService from './playerService'
import textService from './textService'
import materialService from './materialService'
import gamepadService from './gamepadService'
import uiBinderService from './uiBinderService'
import Game from './game'

import { PLAYER_TRACTOR, PLAYER_FACE } from './playerConstants'
import { EGG_VIRUS_BLUE, EGG_VIRUS_RED, EGG_MASK_GREEN } from './eggConstants'

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
        uiBinderService
    },
    // callback to run when game is over
    exitCallback,
    gameSpeedOptions: {
        initialGameSpeed: 1350,
        gameSpeedStep: 150,
        maxGameSpeed: 400,
        // how frequently do we speed up the game
        initialStageCapacity: 6
    },
    energyOptions: {
        // if X items are dropped - add 1 live
        increaseWhenDropped: 10
    },
    gameMode: {
        // => allowDrop && collect 
        // => collector mode (player on the ground)

        // => allowDrop && !collect
        // => survival mode (player on the ground)

        // => !allowDrop && collect 
        // => 4-points collector mode, aka standard 'Wolf and Eggs'

        // => !allowDrop && !collect
        // FUCK, what's the hell is going on?))

        // set to TRUE to move Player only in X axis
        // set to FALSE to move Player in X and Y axises
        // TODO: when FALSE - update gaming logic not to play unlimited amount of time and dropped eggs - double callback needed: 
        //                    if on the edge - check where's player - if not here - drop, if here - survive
        allowDrop: true,
        // set to TRUE to collect all the eggs (so you have not to allow an egg to break)
        // set to FALSE to your Player has to avoid contacts with eggs
        collect: false
    },
    UI: {
        playerCoordMaxLeft: -50,
        playerCoordMaxRight: 50,
        playerCoordMaxTop: 160,
        playerCoordMaxBottom: -170
    }
}

const game = new Game(gameOptions)

const servicesOptions = {
    ...gameOptions,
    energyServiceOptions: {
        // initial number of lives
        initial: 7        
    },
    playerServiceOptions: {
        // id of item in SparkAR
        identifier: 'player',
        // this is to set up player image and parameters
        playerConfig: PLAYER_TRACTOR
    },
    textServiceOptions: {
        txtLevelId: 'txtLevel',
        txtEggsId: 'txtEggs',
        txtLivesId: 'txtLives',
        txtTimerId: 'txtTimer'
    },
    gamepadServiceOptions: {
        // play / pause the Game
        togglePlay: () => game.togglePlay()
    },
    eggServiceOptions: {
        // 1 out of 6 is a healing mask
        eggProbabilityArray: [
            [ EGG_VIRUS_RED, 2 ]
            , [ EGG_VIRUS_BLUE, 2 ]
            , [ EGG_MASK_GREEN, 1 ]
        ]
    }
}

Promise.all([
    energyService.init(servicesOptions),
    eggService.init(servicesOptions),
    playerService.init(servicesOptions),
    textService.init(servicesOptions),
    materialService.init(servicesOptions),
    gamepadService.init(servicesOptions),
    uiBinderService.init(servicesOptions),
])
.then(() => {
    // this line is left to easy test
    setTimeout(() => { startTheGame() }, 1000)

    // this is to test screen size, as I'd like elements to be relatively positioned, not static
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