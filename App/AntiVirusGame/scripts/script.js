/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

const Time = require('Time')

import { log } from './logger'

import masks from './masks'
import viruses from './viruses'
import faces from './faces'
import Game from './game'

const exitCallback = (virusesCount) => {
    log(`--- -- - game finised - -- - total score: ${virusesCount} viruses - -- ---`)
}

const startTheGame = () => {
    log(`- -- --- ---- ----- ------ ------- script started on ${new Date()} ------- ------ ----- ---- --- -- -`)

    const game = new Game(faces, masks, viruses, exitCallback)
    game.play()
}

Promise.all([
    masks.init(),
    viruses.init(),
    faces.init()
])
.then(Time.setTimeout(() => { startTheGame() }, 5000))