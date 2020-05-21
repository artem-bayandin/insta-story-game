const Materials = require('Materials')

import { log } from './logger'
import { Base, findMe } from './base'

export const FACE_MATERIAL_TRACTOR = 'FACE_MATERIAL_TRACTOR'
export const FACE_MATERIAL_FACE = 'FACE_MATERIAL_FACE'

class Face extends Base {
    constructor(id, face) {
        super(id, face)
    }
}

const initFace = (identifier, materialType) => {
    return new Promise((res, rej) => {
        findMe(identifier)
            .then(item => {
                log(`FACE FOUND ${materialType}`)
                switch(materialType) {
                    case FACE_MATERIAL_FACE:
                        log(`MATERIAL TO BE 1: ${materialType}`)
                        Materials.findFirst('face-2')
                            .then(mat => {
                                item.material = mat
                                item.transform.scaleX = 700
                                item.transform.scaleY = 750
                                const face = new Face(identifier, item)
                                res(face)
                            })
                        break
                    case FACE_MATERIAL_TRACTOR:
                        log(`MATERIAL TO BE 2: ${materialType}`)
                        Materials.findFirst('belarus-1')
                            .then(mat => {
                                item.material = mat
                                item.transform.scaleX = 1000
                                item.transform.scaleY = 780
                                const face = new Face(identifier, item)
                                res(face)
                            })
                        break
                    default:
                        break
                }
            })
    })
}

export default initFace