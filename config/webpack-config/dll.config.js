const path = require('path')

const baseConfig = require('./config')

const entry = {
  // utils: ['vue/dist/vue.esm.js', 'vuex'],
  vue: ['vue/dist/vue.esm.js'],
  vuex: ['vuex']
}

const output = {
  path: path.join(__dirname, baseConfig.dllConfigOutputPath), // 放在项目的static/js目录下面
  filename: '[name].dll.js', //打包文件的名字
  library: '[name]_library' //可选 暴露出的全局变量名
  // utils.dll.js中暴露出的全局变量名。
  // 主要是给DllPlugin中的name使用，
  // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
}

const DllPluginConfig = {
  // context: __dirname,
  name: "[name]_library",
  path: path.join(__dirname, baseConfig.dllConfigOutputPath, "[name].dll.manifest.json"), // 生成上文说到清单文件，这个看你自己想放哪里了。
}


const getPackageConfig = () => {
  const DllReferencePluginConfig = []
  const AddAssetHtmlPluginConfig = []
  Object.keys(entry).forEach(item => {
    DllReferencePluginConfig.push({
      context: __dirname,
      manifest: require(path.join(__dirname, baseConfig.dllConfigOutputPath, `${item}.dll.manifest.json`))
    })
    AddAssetHtmlPluginConfig.push([{
      filepath: path.resolve(path.join(__dirname, baseConfig.dllConfigOutputPath, `${item}.dll.js`)),
      outputPath: './js',
      publicPath: path.posix.join('./', './js'),
      // includeSourcemap: false,
      // hash: true,
    }])
  })
  return {
    DllReferencePluginConfig,
    AddAssetHtmlPluginConfig
  }
}





module.exports = {
  entry,
  output,
  DllPluginConfig,
  getPackageConfig
}