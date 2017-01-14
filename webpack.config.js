var webpack = require('webpack');
var path = require('path');
var NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {

    entry: {
        main: './devel/js'
    },
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'bundle.js'
    },
    watch: NODE_ENV == 'development',
    devtool: (NODE_ENV == 'development')
        ? 'source-map'
        : null,
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({NODE_ENV: JSON.stringify(NODE_ENV)})
    ],
    module: {

        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: [
                        'es2015', 'react'
                    ],
                    plugins: ['transform-runtime']
                }
            }, {
                test: /\.less$/,
                loader: 'style!css!less'
            }

        ]
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        extensions: [
            '', '.js'
        ],
        moduleTemplates: ['*-loader']
    }
}
