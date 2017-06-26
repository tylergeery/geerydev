var webpack = require('webpack'); // Requiring the webpack lib
var path = require('path');

module.exports = {
    entry: {
        bundle: './js/src/entry/index.js',
        admin: './js/src/entry/admin.js'
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
