# webpack配置

## 遇到一个超级大坑 （vue-loader报错）

为了引入.vue文件，安装完vue-loader和vue-template-compiler后，运行报错。
原因是vue-loader，15的版本需要再添加plugin的配置。有两种解决方法：

1. 把安装版本改为14的 （个人试过好像没有解决，可能是其他的原因，大部分人都说解决了）。
2. 在webpack.config.js中添加：

```js
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    // ...
    plugins: [
        new VueLoaderPlugin()
    ]
}
```

## 加载less文件（less-loader使用不成功的问题）

要依次用style-loader,css-loader,less-loader。如下：

```js
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