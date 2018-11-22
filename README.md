# LS_1

## 启动项目

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 配置webpack

### 遇到一个超级大坑 （vue-loader报错）

为了引入.vue文件，安装完vue-loader和vue-template-compiler后，运行报错。
原因是vue-loader，15的版本需要再添加plugin的配置。有两种解决方法：

1. 把安装版本改为14的 （个人试过好像没有解决，可能是其他的原因，大部分人都说解决了）。
2. 在webpack.config.js中添加：

``` js
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    // ...
    plugins: [
        new VueLoaderPlugin()
    ]
}
```

### 加载less文件（less-loader使用不成功的问题）

要依次用style-loader,css-loader,less-loader。如下：

``` js
module.exports = {
    module: {
        // ...
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
        ]
    }
}
```

### html-webpack-plugin插件

使用此插件会在dist目录下自动生成一个新的index.html文件（并替换旧的index.html），并且把所有入口起点生成的文件引入在index.html的script中。这样我们就不需要我们再手动修改index.html中的引入文件了。

``` js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // ...
    plugins: [
        new HtmlWebpackPlugin()
    ]
}
```

### clean-webpack-plugin插件，清理 /dist 文件夹

``` js
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    // ...
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ]
}
```

### 模块热替换

如果你使用了 webpack-dev-middleware 而没有使用 webpack-dev-server，请使用 webpack-hot-middleware package 包。（ webpack-dev-server 中已经包括引用了模块热替换，可以不用再单独引用了）

### webpack.DefinePlugin指定环境不成功，（尚未找到原因）

###　webpack4.0 分离css和js文件的问题
