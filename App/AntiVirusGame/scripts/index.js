import { log, setTimeout, setBooleanToPatch, sendScalarToPatch, subscribeToPatchBoolean, subscribeToPatchPulse } from './utils'

import energyService from './energyService'
import eggService from './eggService'
import playerService from './playerService'
import textService from './textService'
import uiService from './uiService'
import Game from './game'

// new services and so on
import materials from './materials'
import objects from './objects'
import textures from './textures'
import uiPicker from './uiPicker'

import { PLAYER_TRACTOR } from './playerConstants'
import { EGG_VIRUS_BLUE, EGG_VIRUS_RED, EGG_MASK_GREEN } from './eggConstants'
import { LEVEL, STOPWATCH, PATCHES, INTERACTION_RESULTS } from './commonConstants'

import { faceOptions, tractorOptions, mustacheOptions, bumagaOptions, rickOptions, mortyOptions } from './playerSettings'

let currentPlayerOptions = rickOptions

const minRoadSpeed = 7
const maxRoadSpeed = 1
const roadSpeedStep = 0.4
const setRoadSpeed = (level) => {
    if (level > (minRoadSpeed - maxRoadSpeed) /roadSpeedStep) return // have reached max speed already - no need to signal anything
    const newSpeed = minRoadSpeed - (level * roadSpeedStep)
    sendScalarToPatch(PATCHES.INPUTS.ROAD.DURATION, newSpeed)
}

const showMenu = () => {    
    textService.clearAll()
    setRoadSpeed(0)
    uiService.initAvoidCollect()
}

const exitCallback = ({eggs, time, /* energyUsed,*/ winner, level, pauseBeforeInteractionResult = 500}) => {
    setTimeout(() => {
        const winnerResult = winner ? INTERACTION_RESULTS.WIN : INTERACTION_RESULTS.GAME_OVER
        setBooleanToPatch(PATCHES.INPUTS.PLAYING, false)
        eggService.hideAll()
        textService.setText(level, eggs, 0)
        textService.setInteractionResult(winnerResult)
    }, pauseBeforeInteractionResult)
    log(`--- -- - game finised - -- - total score: ${eggs} eggs, ${energyService.energyUsed()} energy used, time: ${Math.floor(time/1000)} seconds - -- ---`)

    uiPicker.show()
}

const modeChangedCallback = (playerSettings, hardUpdate = false) => {
    if (!game.isRunning()) {
        const prevSettingsId = currentPlayerOptions.screenOptions.playerConfig.ID
        const nextSettingsId = playerSettings.screenOptions.playerConfig.ID
        if (prevSettingsId === nextSettingsId && !hardUpdate) {
            return
        }
        game.updateSettings(playerSettings)
        eggService.updateSettings(playerSettings)
        playerService.updateSettings(playerSettings)
        uiService.updateSettings(playerSettings)
        uiService.initAvoidCollect()
        uiService.initTopRowIcons()

        currentPlayerOptions = playerSettings
    }
}

subscribeToPatchPulse(PATCHES.OUTPUTS.TAPPED, (options) => {
    if (game.isOver() || !game.isRunning()) {
        uiPicker.hide()
        textService.setText(0, 0, energyService.capacityLeft())
        textService.setTime(0)
        textService.setInteractionResult(' ')
        
        const newOptions = {
            ...gameOptions,
            currentPlayerOptions
        }
        energyService.reset(newOptions)

        game = new Game(newOptions)
        game.play()

        setBooleanToPatch(PATCHES.INPUTS.PLAYING, true)
    }
})

const gameOptions = {
    // callback to run when game is over
    exitCallback,
    levelUpCallback: setRoadSpeed,
    gameSpeedOptions: {
        initialGameSpeed: 1250,
        maxGameSpeed: 250,
        gameSpeeds: [ {
            step: 150,
            delimiter: 950
        }, {
            step: 125,
            delimiter: 575
        }, {
            step: 75,
            delimiter: 350
        }, {
            step: 20,
            delimiter: 0
        } ],
        // how frequently do we speed up the game
        initialStageCapacity: 5
    },
    energyOptions: {
        // initial number of lives
        initial: 3,
        // if X items are dropped - add 1 live
        increaseWhenDropped: 10,
        maxLevelToAddLiveWhenEggDropped: 10
    },
    UI: {
        playerCoordMaxLeft: -50,
        playerCoordMaxRight: 50,
        playerCoordMaxTop: 160,
        playerCoordMaxBottom: -170
    },
    // this is overwritten in player settings
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
    // this is overwritten in player settings
    screenOptions: {
        // this is to set up player image and parameters
        playerConfig: PLAYER_TRACTOR,

        // icons for top row with stats
        eggCounterIconConfig: EGG_VIRUS_RED(0).STAT_ICON,
        liveCounterIconConfig: EGG_MASK_GREEN(0).STAT_ICON,
        levelCounterIconConfig: LEVEL.STAT_ICON,
        stopwatchCounterIconConfig: STOPWATCH.STAT_ICON
    },
    // this is overwritten in player settings
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

const gameAndPlayerOptions = {
    ...gameOptions,
    ...currentPlayerOptions
}

let game = new Game(gameOptions)

const servicesOptions = {
    ...gameAndPlayerOptions,
    
    gamepadServiceOptions: {
        // play / pause the Game
        togglePlay: () => log(`'togglePlay' is disabled for now`) // game.togglePlay()
    },

    modeChangedCallback
}

Promise.all([
    materials.init(),
    objects.init(),
    textures.init(),
])
.then(() => {
    return Promise.all([
        uiPicker.init(servicesOptions),
        // deviceService.init(),
        energyService.init(servicesOptions),
        eggService.init(servicesOptions),
        textService.init(),
    ])
})
.then(() => {
    return Promise.all([
        uiService.init(servicesOptions),
    ])
})
.then(() => Promise.all([playerService.init(servicesOptions)]))
.then(() => modeChangedCallback(currentPlayerOptions, true))
.then(() => showMenu())
.catch(err => log(`ERROR: ${err}`))