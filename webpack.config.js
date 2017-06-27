var webpack = require('webpack'); // Requiring the webpack lib
var path = require('path');

module.exports = {
    entry: {
        index: './js/src/entry/index',
        portfolio: './js/src/entry/portfolio',
        about: './js/src/entry/about',
        common: './js/src/entry/common', // catch-all

        admin: './js/src/entry/admin'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel' // Include the react-hot loader
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'js/dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() // Wire in the hot loading plugin
    ]
};
