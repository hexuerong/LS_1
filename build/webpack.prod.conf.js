'use strict'
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'js/[name].bundle.js',
    },
    plugins: [
        new CleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname, '../'),//根目录
            verbose: true,//开启在控制台输出信息
        }),
        new UglifyJsPlugin({//没起作用，webpack4.0版本好像已经废弃这个了
            sourceMap: true
        }),
        new webpack.DefinePlugin({//指定环境（没起作用，暂时没找到原因）
            // 'process.env.NODE_ENV': '"production"'
            DEVELEPMENT: JSON.stringify(false),
            PRODUCTION: JSON.stringify(true),
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        })
    ],
    optimization: {
        splitChunks: {//失败
            chunks: 'all',//async就失败
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    // name: 'vendors',
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
        ]
    }
});