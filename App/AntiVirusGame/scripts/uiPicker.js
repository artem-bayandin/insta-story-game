const NativeUI = require('NativeUI')
import { log } from './utils'
import textures, { TEXTURES } from './textures'
import { faceOptions, tractorOptions, mustacheOptions, bumagaOptions, rickOptions, mortyOptions } from './playerSettings'

const picker = NativeUI.picker

const init = ({modeChangedCallback}) => {
    const items = [ 
        { 
            image_texture: textures.get(TEXTURES.FACE_WITH_MASK),
            playerSettings: faceOptions
        }, 
        { 
            image_texture: textures.get(TEXTURES.TRACTOR),
            playerSettings: tractorOptions
        }, 
        { 
            image_texture: textures.get(TEXTURES.RICK),
            playerSettings: rickOptions
        }, 
        { 
            image_texture: textures.get(TEXTURES.MORTY),
            playerSettings: mortyOptions
        }, 
        { 
            image_texture: textures.get(TEXTURES.MUSTACHE),
            playerSettings: mustacheOptions
        }, 
        { 
            image_texture: textures.get(TEXTURES.A4),
            playerSettings: bumagaOptions
        }, 
    ]

    const configuration = { 
        selectedIndex: 2,
        items
    }

    const callback = (index) => {
        if (modeChangedCallback && typeof(modeChangedCallback) === 'function') {
            modeChangedCallback(items[index].playerSettings)
        }
    }
    
    picker.configure(configuration)
    
    picker.visible = true
    
    picker.selectedIndex.monitor().subscribe(function(index) { 
        log(`new index: ${index.newValue}`)
        callback(index.newValue)
    });

    // set current settings
    callback(configuration.selectedIndex)

    log(`[uiPicker] initialized`)
}

const uiPicker = {
    init
}

export default uiPicker