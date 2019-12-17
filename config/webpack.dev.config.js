const baseConfig = require('./webpack.base.config')

baseConfig.devServer = {
  // contentBase: "./public", // 本地服务器所加载的页面所在的目录
  historyApiFallback: true, // 不跳转
  inline: true // 实时刷新
}

module.exports = baseConfig