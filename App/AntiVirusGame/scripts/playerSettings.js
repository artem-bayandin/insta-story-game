import { PLAYER_FACE, PLAYER_TRACTOR, PLAYER_MUSTACHE, PLAYER_A4 } from './playerConstants'
import { EGG_VIRUS_RED, EGG_VIRUS_BLUE, EGG_MASK_GREEN } from './eggConstants'
import { EGG_POTATO, EGG_DOLLAR, EGG_FIRE, EGG_PAPER } from './eggConstants'
import { LEVEL, STOPWATCH } from './commonConstants'
import { PLAYER_RICK, PLAYER_MORTY, EGG_RICK, EGG_MORTY, EGG_PINK, EGG_SUN, EGG_CUCU } from './rickMortySettings'

/*
 * OPTIONS FOR DIFFERENT PLAYERS
 */

export const faceOptions = {
    gameMode: {
        allowDrop: true,
        collect: false
    },
    screenOptions: {
        playerConfig: PLAYER_FACE,
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
            , [ EGG_VIRUS_BLUE(-1), 5 ]     // -1   3
            , [ EGG_MASK_GREEN(1), 2 ]      //  1   1   this config is comfortable
        ]
    }
}

export const tractorOptions = {
    gameMode: {
        allowDrop: true,
        collect: false
    },
    screenOptions: {
        playerConfig: PLAYER_TRACTOR,
        eggCounterIconConfig: EGG_VIRUS_RED(0).STAT_ICON,
        liveCounterIconConfig: EGG_POTATO(0).STAT_ICON,
        levelCounterIconConfig: LEVEL.STAT_ICON,
        stopwatchCounterIconConfig: STOPWATCH.STAT_ICON
    },
    eggOptions: {
        // if (collect)     then killers::healers should be 1:4
        // if (!colelct)    then killers::healers should be 4:1
        probability: [
            [ EGG_VIRUS_RED(-1), 6 ]
            , [ EGG_FIRE(-1), 5 ]
            , [ EGG_POTATO(1), 2 ]
        ]
    }
}

export const mustacheOptions = {
    gameMode: {
        allowDrop: true,
        collect: false
    },
    screenOptions: {
        playerConfig: PLAYER_MUSTACHE,
        eggCounterIconConfig: EGG_VIRUS_RED(0).STAT_ICON,
        liveCounterIconConfig: EGG_POTATO(0).STAT_ICON,
        levelCounterIconConfig: LEVEL.STAT_ICON,
        stopwatchCounterIconConfig: STOPWATCH.STAT_ICON
    },
    eggOptions: {
        // if (collect)     then killers::healers should be 1:4
        // if (!colelct)    then killers::healers should be 4:1
        probability: [
            [ EGG_VIRUS_RED(-1), 6 ]
            , [ EGG_DOLLAR(-1), 5 ]
            , [ EGG_POTATO(1), 2 ]
        ]
    }
}

export const bumagaOptions = {
    gameMode: {
        allowDrop: true,
        collect: false
    },
    screenOptions: {
        playerConfig: PLAYER_A4,
        eggCounterIconConfig: EGG_VIRUS_RED(0).STAT_ICON,
        liveCounterIconConfig: EGG_PAPER(0).STAT_ICON,
        levelCounterIconConfig: LEVEL.STAT_ICON,
        stopwatchCounterIconConfig: STOPWATCH.STAT_ICON
    },
    eggOptions: {
        // if (collect)     then killers::healers should be 1:4
        // if (!colelct)    then killers::healers should be 4:1
        probability: [
            [ EGG_VIRUS_RED(-1), 6 ]
            , [ EGG_FIRE(-1), 5 ]
            , [ EGG_PAPER(1), 2 ]
        ]
    }
}

export const rickOptions = {
    gameMode: {
        allowDrop: true,
        collect: false
    },
    screenOptions: {
        playerConfig: PLAYER_RICK,
        eggCounterIconConfig: EGG_SUN(0).STAT_ICON,
        liveCounterIconConfig: EGG_RICK(0).STAT_ICON,
        levelCounterIconConfig: LEVEL.STAT_ICON,
        stopwatchCounterIconConfig: STOPWATCH.STAT_ICON
    },
    eggOptions: {
        // if (collect)     then killers::healers should be 1:4
        // if (!colelct)    then killers::healers should be 4:1
        probability: [
            [ EGG_SUN(-1), 4 ]
            , [ EGG_CUCU(-1), 4 ]
            , [ EGG_PINK(-1), 3 ]
            , [ EGG_MORTY(1), 2 ]
        ]
    }
}

export const mortyOptions = {
    gameMode: {
        allowDrop: true,
        collect: false
    },
    screenOptions: {
        playerConfig: PLAYER_MORTY,
        eggCounterIconConfig: EGG_PINK(0).STAT_ICON,
        liveCounterIconConfig: EGG_MORTY(0).STAT_ICON,
        levelCounterIconConfig: LEVEL.STAT_ICON,
        stopwatchCounterIconConfig: STOPWATCH.STAT_ICON
    },
    eggOptions: {
        // if (collect)     then killers::healers should be 1:4
        // if (!colelct)    then killers::healers should be 4:1
        probability: [
            [ EGG_SUN(-1), 4 ]
            , [ EGG_CUCU(-1), 4 ]
            , [ EGG_PINK(-1), 3 ]
            , [ EGG_RICK(1), 2 ]
        ]
    }
}