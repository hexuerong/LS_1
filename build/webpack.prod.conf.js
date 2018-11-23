'use strict'
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');//分离css

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'js/[name].bundle.js',
    },
    plugins: [
        new UglifyJsPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({//指定环境
            // 'process.env.NODE_ENV': '"production"'
            DEVELEPMENT: JSON.stringify(false),
            PRODUCTION: JSON.stringify(true),
        }),
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
});