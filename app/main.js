//main.js 

import './hello'

import './Greeter.scss';

const greeter = require('./Greeter.js');
document.querySelector("body").appendChild(greeter());


var a = [1,2,3,4]

a.map(item => console.log(item))

// import jQuery from 'expose-loader?$!jquery'

// let h1 = document.createElement('h1')
// h1.innerHTML ='h1'

// window.onload = function(){
//   document.body.appendChild(h1)
// }

// console.log(jQuery('body'))

// console.log(jQuery)

// require('expose-loader?$1!expose?jQuery1!jquery');


var axois = require('axios') 

console.log(axois)


// let getLazy = componentName => resolve => require(['./lazy'], components => resolve(components[componentName]))

document.body.onclick = () => {
  console.log('onclick')
  // require('./lazy/mylog.js')

  require.ensure(['./lazy/mylog.js'], function(require) {
    var a = require("./lazy/mylog.js");
    a.say()
    console.log('end') 
  })
}

document.body.onmouseup = () => {
  console.log('onclick')
  // require('./lazy/mylog.js')
  import('./lazy/mylog.esm.js').then((...args) => {
    console.log(args)
    console.log(args[0])
  })

}

import comFN from './app-main.esm'

comFN.fn('main')



import _ from 'lodash'
console.log(_.concat([],['main']))


$('body')

var ss = require('./app-main.common')

ss('app-common')