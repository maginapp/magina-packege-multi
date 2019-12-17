import _ from 'lodash'

import './app.scss'
import './test.scss'

import comFN from './app-main.esm'

comFN.fn('app')

var ss = require('./app-main.common')

ss('app-common')

console.log('loading.app.js')

console.log(_.concat([],['app']))

// $('body')