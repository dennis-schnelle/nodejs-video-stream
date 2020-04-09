const path = require('path');

module.exports = {
    entry: './src/app/main.tsx',
    output: {
        path: __dirname + '/public',
        filename: 'build/main.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            components: path.resolve(__dirname, './src/app/components'),
        },
    },
    module: {
        rules: [{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' }],
    },
};
