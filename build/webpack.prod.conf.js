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
        // filename: 'js/[name].[hash].bundle.js',
        filename: 'js/[name].bundle.js',
        // chunkFilename: 'js/[id].js'//分离js
    },
    plugins: [
        new UglifyJsPlugin({
            sourceMap: true
        }),
    ],
    optimization: {
        /* splitChunks: {//分离js
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        } */
    },
});