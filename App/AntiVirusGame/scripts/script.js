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

import masks from './masks'
import viruses from './viruses'

// To access scene objects
// const directionalLight = Scene.root.find('directionalLight0');

// To access class properties
// const directionalLightIntensity = directionalLight.intensity;

const timeout = 250

const simulate = () => {
    log('- -- --- ---- ----- ------ ------- simulation started ------- ------ ----- ---- --- -- -')

    const func = {
        f1: () => {
            log(`--- should say '100% health'`)
            masks.addMask()
        },
        f2: () => {
            log(`--- should say '1 removed'`)
            masks.removeMask()
        },
        f3: () => {
            log(`--- should say '2 removed'`)
            masks.removeMask()
        },
        f4: () => {
            log(`--- should say '3 removed, you died'`)
            masks.removeMask()
        },
        f5: () => {
            log(`--- should say '1 added'`)
            masks.addMask()
        },
        f6: () => {
            log(`--- should say '2 added'`)
            masks.addMask()
        },
        f7: () => {
            log(`--- should say '3 added, 100% health'`)
            masks.addMask()
        },
        f8: () => {
            log('ticking viruses...')
            viruses.tick()
        },
        f9: () => {
            log('ticking viruses...')
            viruses.tick()
        },
        f10: () => {
            log('ticking viruses...')
            viruses.tick()
        },
        f11: () => {
            log('ticking viruses...')
            viruses.tick()
        }
    }

    Object.keys(func).map((key, index) => {
        Time.setTimeout(() => {
            func[key]()
        }, timeout * (index + 1));
    })
}

Promise.all([
    masks.init(),
    viruses.init()
])
.then(simulate)