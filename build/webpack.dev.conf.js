'use strict'
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');


module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',//开发环境
    devServer: {
        // contentBase: false,
        contentBase: path.join(__dirname, '../static'),
        host: 'localhost',
        port: 9000,
        hot: true,
        open: false,//是否自动打开浏览器
        clientLogLevel: 'warning',//开发工具(DevTools)的控制台(console)显示警告消息
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({//指定环境
            // 'process.env.NODE_ENV': '"development"'
            DEVELEPMENT: JSON.stringify(true),
            PRODUCTION: JSON.stringify(false),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
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
});