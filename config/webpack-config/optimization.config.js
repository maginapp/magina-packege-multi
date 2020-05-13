const TerserPlugin = require('terser-webpack-plugin')
// const uglify = require('uglifyjs-webpack-plugin')

const prodMode = (process.env.NODE_ENV && process.env.NODE_ENV.trim()) === 'production'

module.exports = {

  splitChunks: {
    chunks: 'initial',
    minChunks: 2,
    minSize: 30000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 6,
    maxInitialRequests: 4,
    automaticNameMaxLength: 30,
    automaticNameDelimiter: '.',
    cacheGroups: {
      vendors: {
        name: 'vendors',
        test: /[\\/]node_modules[\\/]/,
        // test: /([\\/]node_modules[\\/])|([\\/]app[\\/])/,
        minChunks: 1, // 一次即引入 
        priority: -10
      },
      default: {
        name: 'default',
        test: /[\\/]app[\\/]/, // app 
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      },
      styles: {
        name: 'style',
        minChunks: 2,
        minSize: 0,
        test: /\.(sc|sa|c)ss$/,
        chunks: 'async',
        reuseExistingChunk: true,
        enforce: true,
        priority: -40
      }
    }
  },
  // runtimeChunk:{
  //   name:'manifest'
  // },
  runtimeChunk: {
    name: entrypoint => {
      console.log(entrypoint)
      return `manifest.${entrypoint.name}`
    }
  },
  
  minimize: true,
  minimizer: [
    new TerserPlugin({
      // sourceMap: prodMode, // Must be set to true if using source-maps in production
      terserOptions: {
        parallel: 4,
        compress: {
          drop_debugger: prodMode,
          drop_console: prodMode,
        },
      },
    })
    // new uglify()
  ],
}