import { log, setTimeout, findMe, setPosition, setBooleanToPatch } from './utils'

import energyService from './energyService'
import eggService from './eggService'
import playerService from './playerService'
import textService from './textService'
import materialService from './materialService'
import gamepadService from './gamepadService'
import uiService from './uiService'
import deviceService from './deviceService'
import Game from './game'

import { PLAYER_TRACTOR, PLAYER_FACE } from './playerConstants'
import { EGG_VIRUS_BLUE, EGG_VIRUS_RED, EGG_MASK_GREEN } from './eggConstants'
import { LEVEL, STOPWATCH, PATCHES, INTERACTION_RESULTS } from './commonConstants'

const startTheGame = () => {
    log(`- -- --- ---- ----- ------ ------- script started on ${new Date()} ------- ------ ----- ---- --- -- -`)
    game.play()
    setBooleanToPatch(PATCHES.INPUTS.ROAD.MOVE, true)
    // setBooleanToPatch(PATCHES.INPUTS.INTERACTION_VISIBLE, true)
}

const exitCallback = ({eggs, time, winner, pauseBeforeInteractionResult = 500}) => {
    setTimeout(() => {
        const winnerResult = winner ? INTERACTION_RESULTS.WIN : INTERACTION_RESULTS.GAME_OVER
        textService.setInteractionResult(winnerResult)
    }, pauseBeforeInteractionResult)
    setBooleanToPatch(PATCHES.INPUTS.ROAD.MOVE, false)
    log(`--- -- - game finised - -- - total score: ${eggs} eggs, time: ${Math.floor(time/1000)} seconds - -- ---`)
}

const tractorOptions = {
    gameMode: {
        allowDrop: true,
        collect: false
    },
    screenOptions: {
        playerConfig: PLAYER_TRACTOR,
        eggCounterIconConfig: EGG_VIRUS_RED(0).STAT_ICON,
        liveCounterIconConfig: EGG_MASK_GREEN(0).STAT_ICON,
        levelCounterIconConfig: LEVEL.STAT_ICON,
        stopwatchCounterIconConfig: STOPWATCH.STAT_ICON
    },
    eggOptions: {
        // if (collect)     then killers::healers should be 1:4
        // if (!colelct)    then killers::healers should be 4:1
        probability: [
            [ EGG_VIRUS_RED(-1), 6 ]        // -1   4
            , [ EGG_VIRUS_BLUE(-2), 1 ]     // -1   3
            , [ EGG_MASK_GREEN(1), 1 ]      //  1   1   this config is comfortable
        ]
    }
}

const gameOptions = {
    // callback to run when game is over
    exitCallback,
    gameSpeedOptions: {
        initialGameSpeed: 1350,
        maxGameSpeed: 333,
        gameSpeeds: [ {
            delimiter: 1000,
            step: 150
        }, {
            delimiter: 700,
            step: 100
        }, {
            delimiter: 400,
            step: 75
        }, {
            delimiter: 0,
            step: 15
        } ],
        // how frequently do we speed up the game
        initialStageCapacity: 6
    },
    energyOptions: {
        // initial number of lives
        initial: 7,
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
    },
    // this should be totally rewritten with 'current game settings'
    screenOptions: {
        // this is to set up player image and parameters
        playerConfig: PLAYER_TRACTOR,

        // icons for top row with stats
        eggCounterIconConfig: EGG_VIRUS_RED(0).STAT_ICON,
        liveCounterIconConfig: EGG_MASK_GREEN(0).STAT_ICON,
        levelCounterIconConfig: LEVEL.STAT_ICON,
        stopwatchCounterIconConfig: STOPWATCH.STAT_ICON
    },
}

const gameAndPlayerOptions = {
    ...gameOptions,
    ...tractorOptions
}

const game = new Game(gameAndPlayerOptions)

const servicesOptions = {
    ...gameAndPlayerOptions,
    
    gamepadServiceOptions: {
        // play / pause the Game
        togglePlay: () => game.togglePlay()
    }
}

Promise.all([
    materialService.init(),
    deviceService.init()
]).then(() => {
    // Xiaomi: 1080 : 2260 : 2.75
    log(`DEVICE SETTINGS: ${JSON.stringify(deviceService.settings)}`)
    return Promise.all([
        energyService.init(servicesOptions),
        eggService.init(servicesOptions),
        playerService.init(servicesOptions),
        textService.init(),
        gamepadService.init(servicesOptions),
        uiService.init(servicesOptions),
    ])
})
.then(startTheGame)