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

const Scene = require('Scene')
const Diagnostics = require('Diagnostics')
const Time = require('Time')

import { log } from './logger'

import masks from './masks.js'

// To access scene objects
// const directionalLight = Scene.root.find('directionalLight0');

// To access class properties
// const directionalLightIntensity = directionalLight.intensity;

const simulate = () => {
    log('### ### ### simulation started ### ### ###')

    Time.setTimeout(() => {
        log(`2 sec, should say '100% health'`)
        masks.addMask()
    }, 2000)

    Time.setTimeout(() => {
        log(`4 sec, should say '1 removed'`)
        masks.removeMask()
    }, 4000)

    Time.setTimeout(() => {
        log(`6 sec, should say '2 removed'`)
        masks.removeMask()
    }, 6000)

    Time.setTimeout(() => {
        log(`8 sec, should say '3 removed, you died'`)
        masks.removeMask()
    }, 8000)

    Time.setTimeout(() => {
        log(`10 sec, should say '1 added'`)
        masks.addMask()
    }, 10000)

    Time.setTimeout(() => {
        log(`12 sec, should say '2 added'`)
        masks.addMask()
    }, 12000)

    Time.setTimeout(() => {
        log(`14 sec, should say '3 added, 100% health'`)
        masks.addMask()
    }, 14000)
}

Promise.all([
    masks.init()
])
.then(simulate)