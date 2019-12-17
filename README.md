# magina-webpack-package

>  单页多页脚手架，推荐node 10x

> axois lodash vue vuex jquery qs MD5 仅用于测试功能


### 单元测试配置

[karma.conf.js](test/unit/karma.conf.js)]



> npm i --savde-dev karma mocha chai  karma-mocha karma-chrome-launcher karma-chai karma-coverage karma-spec-reporter karma-webpack

* karma-sourcemap-loader 未确定作用

* 使用webpack测试的是处理后的代码

* [karma-coverage文档](https://www.zybuluo.com/wangxingkang/note/790416)

### babel

#### 运行顺序

如果某些plugins/presets处理同一段代码，按以下顺序执行

* plugins在presets前运行

* plugins从前往后执行

* presets从后往前执行

core-js@3需要单独安装，@babel/polyfill 版本默认会安装 "corejs": 2

> npm install --save core-js@3

```json
{
    "presets": [
        [
            "@babel/env",
            {
                "useBuiltIns": "usage",
                "corejs": 3
            }
        ]
    ],
    "plugins": [
        [
            "@babel/plugin-transform-runtime"
        ]
    ]
}
```

* 支持原型方法，且不污染全局变量的配置

> npm install @babel/runtime-corejs3 --save

> `core-js: 2`，其中不包含实例的 polyfill 需要单独引入。

> 配置的 `corejs: 3` 版本，实例方法和全局方法，都不会再污染全局环境

```json
{
    "presets": [
        [
            "@babel/env"
        ]
    ],
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                "corejs": 3
            }
            
        ]
    ]
}
```