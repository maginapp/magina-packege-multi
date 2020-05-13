const path = require('path')
const fs = require('fs')

const rootPath = process.cwd()

// const configPath = '../'

const config = {
  codeRootPath: 'app',
  buildRootPath: 'dist',
  viewsRootPath: 'app/assets/views',
}


module.exports = {
  onepageEntry: {name: './app/main.js'}, // false 或 单页入口 {name: './app/main.js'}
  onepageHtmlPluginConfig: false,
  rootPath,
  hashLength: 5,
  codePath: path.join(rootPath, config.codeRootPath),
  buildPath: path.join(rootPath, config.buildRootPath),
  viewsPath: path.join(rootPath, config.viewsRootPath),
  ...config,
  dllConfigOutputPath: '../../app/assets/dll/'
}