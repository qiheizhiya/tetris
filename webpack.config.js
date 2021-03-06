const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const clearWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/bunder.js'
    },
    plugins: [
        new clearWebpackPlugin.CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
    module: {
        rules: [
            { test: /.ts$/, use: {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            } }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        open: true,
        port: 8081
    }
}