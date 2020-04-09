const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
    target: 'node',
    entry: './src/server/bootstrap.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'app.js',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            src: path.resolve(__dirname, './src'),
            tests: path.resolve(__dirname, './tests'),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: [/build/, /__test__/, /node_modules/],
            },
            {
                test: /\.csv$/i,
                use: 'raw-loader',
            },
        ],
    },
    plugins: [new NodemonPlugin()],
};
