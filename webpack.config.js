var webpack = require('webpack'); // Requiring the webpack lib
var path = require('path');

module.exports = {
    entry: {
        index: './js/src/entry/index',
        portfolio: './js/src/entry/portfolio',
        about: './js/src/entry/about',
        sudoku: './js/src/entry/sudoku',
        single: './js/src/entry/single', // catch-all
        common: './js/src/entry/common', // catch-all

        admin: './js/src/entry/admin'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'js/dist'),
        publicPath: '/',
        filename: '[name].js'
    }
};
