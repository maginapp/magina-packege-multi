// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const baseConfig = require('./webpack.prod.config')

const plugins = [
  // new CleanWebpackPlugin(),
  new BundleAnalyzerPlugin()
]

baseConfig.plugins.push(...plugins)

module.exports = baseConfig