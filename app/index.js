import comFN from './app-main.esm'



comFN.fn('index')

console.log('loading.index.js')

import './index.scss'
import './app.scss'
import './test.scss'

import _ from 'lodash'
console.log(_.concat([],['index']))

import vuex from 'vuex'

console.log(vuex)

// import qs from 'qs'

// import {qs} from 'utils_library'

// console.log('vuex')
// console.log(vuex)
// console.log(utils_library.qs)
// console.log(utils_library)

var ss = require('./app-main.common')

ss('app-common')


import logo from './assets/images/toabao.jpg'
let img = new Image()
img.src = logo

import logo2 from './assets/images/1.jpg'
let img2 = new Image()
img2.src = logo2

document.body.appendChild(img)
document.body.appendChild(img2)

