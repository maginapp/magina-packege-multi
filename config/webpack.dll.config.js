// webpack.dll.conf.js
// 提前打包一些基本不怎么修改的文件

const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin')

const { entry, output, DllPluginConfig } = require('./webpack-config/dll.config.js')

module.exports = {
  mode: 'production',
  entry,
  output,
  plugins: [
    new webpack.DllPlugin(DllPluginConfig)
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          parallel: 4,
          compress: {
            drop_debugger: true,
            drop_console: true,
          },
        },
      }),
    ],
  }
};