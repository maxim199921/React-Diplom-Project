import Config from 'webpack-config';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ExtractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

export default new Config().merge({
    entry: ["babel-polyfill",'./App.js'],
    output: {
        path: __dirname + '/public',
        publicPath:'/',
    },
    devtool:'source-map',
    module: {
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [['env', {modules: false}], 'stage-0', 'react']
                    },
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "postcss-loader"]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(jpg|jpeg|gif|png)$/,
                exclude: /node_modules/,
                loader:'url-loader?limit=1024&name=images/[name].[ext]'
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].bundle.[hash].css"),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: "body"
        })]
});
