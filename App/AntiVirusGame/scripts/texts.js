import { log } from './logger'
import { Base, findMe } from './base'

class TxtScore extends Base {
    constructor(id, obj) {
        super(id, obj)
    }

    setText(text) {
        // log(`${this.id} set text ${text}`)
        this.obj.text = text.toString()
    }

    clearText() {
        this.obj.text = ''
    }
}

class TxtScoreWithPrefix extends TxtScore {
    constructor(id, obj, prefix) {
        super(id, obj)
        this.prefix = prefix
    }

    setText(text) {
        let message = `${this.prefix}: ${text}`
        super.setText(message)
    }

    clearToPrefix() {
        super.setText(this.prefix)
    }
}

class TxtScoreWithPostfix extends TxtScore {
    constructor(id, obj, postfix) {
        super(id, obj)
        this.postfix = postfix
    }

    setText(text) {
        let message = `${text} ${this.postfix}`
        super.setText(message)
    }
}

class TxtTimerWithPostfix extends TxtScoreWithPostfix {
    constructor(id, obj, postfix) {
        super(id, obj, postfix)
    }

    setText(text) {
        let secondsString = ((+text)/1000).toFixed(1).replace('.', ':')
        super.setText(secondsString)
    }
}

class TxtTimer extends TxtScore {
    constructor(id, obj) {
        super(id, obj)
    }

    setText(text) {
        let secondsString = ((+text)/1000).toFixed(1).replace('.', ':')
        super.setText(secondsString)
    }
}

let txtLevel = null
let txtViruses = null
let txtLives = null
let txtTimer = null

const init = () => {
    const txtLevelPromise = new Promise((res, rej) => {
        const id = 'txtLevel'
        const prefix = 'level'
        findMe(id)
            .then(item => {
                // log(`'${id}' found: ${!!item}`)
                txtLevel = new TxtScore(id, item)
                txtLevel.clearText()
                // log(`'${id}' created: ${!!txtLevel}`)  
                res(txtLevel)
            })
    })
    const txtVirusesPromise = new Promise((res, rej) => {
        const id = 'txtViruses'
        const prefix = 'viruses'
        findMe(id)
            .then(item => {
                // log(`'${id}' found: ${!!item}`)
                txtViruses = new TxtScore(id, item)
                txtViruses.clearText()
                // log(`'${id}' created: ${!!txtViruses}`)  
                res(txtViruses)
            })
    })
    const txtLivesPromise = new Promise((res, rej) => {
        const id = 'txtLives'
        const prefix = 'lifes'
        findMe(id)
            .then(item => {
                // log(`'${id}' found: ${!!item}`)
                txtLives = new TxtScore(id, item)
                txtLives.clearText()
                // log(`'${id}' created: ${!!txtLives}`)  
                res(txtLives)
            })
    })
    const txtTimerPromise = new Promise((res, rej) => {
        const id = 'txtTimer'
        const postfix = 'sec'
        findMe(id)
            .then(item => {
                // log(`'${id}' found: ${!!item}`)
                txtTimer = new TxtTimer(id, item)
                txtTimer.clearText()
                // log(`'${id}' created: ${!!txtTimer}`)  
                res(txtTimer)
            })
    })

    return Promise.all([txtLevelPromise, txtVirusesPromise, txtLivesPromise, txtTimerPromise])
}

const setText = (level, virusesDropped, livesLeft) => {
    txtLevel.setText(level)
    txtViruses.setText(virusesDropped)
    txtLives.setText(livesLeft)
}

const setTime = (ms) => {
    txtTimer.setText(ms)
}

const texts = {
    init,
    setText,
    setTime
}

export default texts