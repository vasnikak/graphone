const path = require('path');

module.exports = {
    mode: 'production',
    entry: ['./src/index.ts'],
    target: ['web', 'es6'],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist')
    }
};
