
const path = require('path')

const webpack = require('webpack')
const HappyPack  = require('happypack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const entry = require('./webpack-config/entry.config')
const config = require('./webpack-config/config')
const optimization = require('./webpack-config/optimization.config')
const { getPackageConfig } = require('./webpack-config/dll.config')
const { DllReferencePluginConfig, AddAssetHtmlPluginConfig } = getPackageConfig()

const { buildPath, viewsPath, onepageEntry, onepageHtmlPluginConfig } = config

//NODE_ENV=production
const prodMode = (process.env.NODE_ENV && process.env.NODE_ENV.trim()) === 'production'

const htmlConfig = onepageEntry ? [new HtmlWebpackPlugin(onepageHtmlPluginConfig)] : Object.keys(entry).map(item => {
  return new HtmlWebpackPlugin({ // Also generate a home.html
    filename: item + '.html',
    template: path.join(viewsPath, item, 'index.html'),
    chunks: [`manifest.${item}`, item, 'vendors', 'default', 'style'],
  })
})


module.exports = {

  devtool: prodMode ? 'source-map' : 'inline-source-map',

  entry,

  output: {
    path: buildPath,
    filename: `js/[name].[chunkhash:${config.hashLength}].js`,
    chunkFilename: `js/[name].[chunkhash:${config.hashLength}].chunk.js`
  },
  
  module: {
    rules: [{
        test: /\.(png|jpe?g|gif|m4a|svg)$/, // 加载js img 对象、css 中的图片、音频等资源
        use: [{
          loader: 'url-loader',
          options: {
            //资源大小小于等于limit值，则会以base64形式加载，不会发请求，大于这个值则用file-loader加载
            limit: 10 * 1024,
            name: 'images/[name].[hash:8].[ext]'
          }
        }]
      },
      // 需要再文件中引用一次 即可在浏览器中全局访问  `expose-loader?$!jquery` `expose-loader?newName!项目引用地址`
      // 配合 ProvidePlugin 可以不用在代码中写 require 直接引用修改后的变量
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?$!expose-loader?jQuery!expose-loader?testj'
      },
      // js babel
      {
        test: /(\.jsx|\.js)$/,
        use: [{
          loader: 'happypack/loader',
          options: {
            id: 'babel'
          }
        }],
        exclude: /node_modules/
      },
      // css
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              // only enable hot in development
              hmr: process.env.NODE_ENV === 'development',
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
            },
          },
          // "style-loader", 
          "css-loader",
          "postcss-loader",
          'sass-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    // 多进程
    new HappyPack({
      id: 'babel',
      threads: 4,
      use: [{
        loader: 'babel-loader',
        options: {
            // sourceMap: !!prodMode,
            cacheDirectory: true
          }
        }]
    }),
    // 处理css
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: prodMode ? 'css/[name].css' : 'css/[name].[chunkhash:8].css',
      chunkFilename: prodMode ? 'css/[name].[id].css' : 'css/[name].[id].[chunkhash:8].css',
    }),
    ...htmlConfig,
    // 当代码里用到了jqeury的别名时 webpack会自动引入jquery 不需要写require
    new webpack.ProvidePlugin({
      '$': 'jquery',
      testj: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery'
    }),
    // 移动纯静态资源
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: '../public/static',
        ignore: ['.*']
      }
    ]),
    ...DllReferencePluginConfig.map(item => new webpack.DllReferencePlugin(item)),
    ...AddAssetHtmlPluginConfig.map(item => new AddAssetHtmlPlugin(item))
  ],

  // 与 ProvidePlugin + expose-loader 相反  
  // 需要script引入js 显示调用var axois = require('axios')  赋值为window.axios的调用结果  打包时实际不会引入
  externals: {
    'axios': 'window.axios'
  },

  // 配置 ts-loader @babel7有替代模块 待升级
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },

  optimization: optimization

}