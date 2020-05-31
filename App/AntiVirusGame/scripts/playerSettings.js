import { PLAYER_FACE, PLAYER_TRACTOR, PLAYER_MUSH, PLAYER_A4 } from './playerConstants'
import { EGG_VIRUS_RED, EGG_VIRUS_BLUE, EGG_MASK_GREEN } from './eggConstants'
import { LEVEL, STOPWATCH } from './commonConstants'

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
            , [ EGG_VIRUS_BLUE(-2), 1 ]     // -1   3
            , [ EGG_MASK_GREEN(1), 1 ]      //  1   1   this config is comfortable
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

export const mushroomsOptions = {
    gameMode: {
        allowDrop: true,
        collect: false
    },
    screenOptions: {
        playerConfig: PLAYER_MUSH,
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

export const bumagaOptions = {
    gameMode: {
        allowDrop: true,
        collect: false
    },
    screenOptions: {
        playerConfig: PLAYER_A4,
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