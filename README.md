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
        //配置文件不在根目录，需要指定根目录
        /* new CleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname, '../'),//根目录
            verbose: true,//开启在控制台输出信息
        }), */
    ]
}
```

### webpack-dev-server

webpack-dev-server主要是启动了一个使用express的Http服务器。它的作用主要是用来伺服资源文件。且伺服的文件是相对publicPath这个路径的。
启动webpack-dev-server后，在目标文件夹中是看不到编译后的文件的,实时编译后的文件都保存到了内存当中。
可以通过访问地址：[http://localhost:9000/webpack-dev-server] 来查看生成在内存中的各资源地址。

- devServer.contentBase是用来配置WDS的静态资源目录的。
- devServer.publicPath用来配置入口chunk的路径，如果未配置，他会自动使用output.path设置。

### 模块热替换

如果你使用了 webpack-dev-middleware 而没有使用 webpack-dev-server，请使用 webpack-hot-middleware package 包。（ webpack-dev-server 中已经包括引用了模块热替换，可以不用再单独引用了）

### webpack.DefinePlugin指定环境不成功

（尚未找到原因）

###　webpack4.0 分离css和js文件的问题

在使用 webpack 构建的典型应用程序或站点中，有三种主要的代码类型：

1. 你或你的团队编写的源码。
2. 你的源码会依赖的任何第三方的 library 或 "vendor" 代码。
3. webpack 的 runtime 和 manifest，管理所有模块的交互。

自webpack v4以来，CommonsChunkPlugin被删除了,大家更支持optimization.splitChunks。下面是webpack提供的一组配置选项：

``` js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',//将选择哪些块进行优化。可能的值是initial(初始块)、async(按需加载块)、all(默认，全部块)。
      minSize: 30000,//要生成的块的最小大小。
      minChunks: 1,//分割前必须共享模块的最小块数。
      maxAsyncRequests: 5,//按需加载时的最大并行请求数。
      maxInitialRequests: 3,//入口点处的最大并行请求数。
      automaticNameDelimiter: '~',//指定用于生成的名称的分隔符。
      name: true,//拆分块的名称。提供true将基于块和缓存组密钥自动生成名称。提供字符串或函数将允许您使用自定义名称。如果名称与入口点名称匹配，则将删除入口点。
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {//mainfest
        name: 'manifest'
    }
  }
};
```

#### 自己的代码，bundle

会根据entry入口生成

#### vendor

见如上所示代码`optimization.splitChunks`。

#### runtime 和 manifest

runtime以及伴随的 manifest 数据，主要是指：在浏览器运行时，webpack 用来连接模块化的应用程序的所有代码。

- runtime 包含：在模块交互时，**连接模块所需的加载和解析逻辑**。包括浏览器中的已加载模块的连接，以及懒加载模块的执行逻辑。
- 当编译器(compiler)开始执行、解析和映射应用程序时，它会**保留所有模块的详细要点**。这个数据集合称为 "Manifest"，当完成打包并发送到浏览器时，会在运行时通过 Manifest 来解析和加载模块。

通过使用 manifest 中的数据，runtime 将能够查询模块标识符，检索出背后对应的模块。

#### 分离css

extract-text-webpack-plugin目前版本不支持webpack4。

解决方案1：
使用extract-text-webpack-plugin的最新的beta版

``` bash
npm install --save-dev extract-text-webpack-plugin@next
```

解决方案2：
webpack4得使用mini-css-extract-plugin这个插件来单独打包css。

``` js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = module.exports={
    // ...
 　　plugins: [
    　　 new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            chunkFilename: "[id].css"
    　　 })
    ],
  　module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    }
}
```