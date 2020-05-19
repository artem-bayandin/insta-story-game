import { log } from './logger'
import { Base, findMe } from './base'

class TxtScore extends Base {
    constructor(id, obj) {
        super(id, obj)
    }

    setText(droppedCounter, level, livesLeft) {
        this.obj.text = `${level} : ${droppedCounter} : ${livesLeft}`
    }
}

let txtScore = null

const init = () => {
    const txtScorePromise = new Promise((res, rej) => {
        const id = 'txtScore1'
        findMe(id)
            .then(item => {
                log(`'${id}' found: ${!!item}`)
                txtScore = new TxtScore(id, item)
                log(`'${id}' created: ${!!txtScore}`)  
                res(txtScore)
            })
    })

    return Promise.all([txtScorePromise])
}

const setText = (droppedCounter, level, livesLeft) => txtScore.setText(droppedCounter, level, livesLeft)

const others = {
    init,
    setText
}

export default others