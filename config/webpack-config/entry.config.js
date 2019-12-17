const fs = require('fs')
const path = require('path')

const config = require('./config')

const {rootPath, viewsPath, onepageEntry } = config

let files = null


let entry = {}

if (onepageEntry) {
  module.exports = onepageEntry
} else {
  try {
    files = fs.readdirSync(viewsPath)
    if (!files || !files.length) throw new Error()
  
  
    files.forEach(item=> {
      entry[item] = path.join(viewsPath, item, 'index.js')
    })
    
    module.exports = entry
  
  } catch (e) {
    
  }
}


