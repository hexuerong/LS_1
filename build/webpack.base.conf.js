'use strict'
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

console.log(process.env.NODE_ENV);

module.exports = {
    entry: {
        app: './src/app.js',
    },
    output: {
        filename: process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname,'./src'),
        },
        extensions: ['.js','.vue','.json','.less','.css']
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new CleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname, '../'),//根目录
            verbose: true,//开启在控制台输出信息
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
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ],
            },
            {
                test: /\.js$/,
                use: ['babel-loader']
            }
        ]
    },
};