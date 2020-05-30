import { PLAYER_TRACTOR } from './playerConstants'
import { EGG_VIRUS_RED, EGG_VIRUS_BLUE, EGG_MASK_GREEN } from './eggConstants'
import { LEVEL, STOPWATCH } from './commonConstants'

/*
 * OPTIONS FOR DIFFERENT PLAYERS
 */

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