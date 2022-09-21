const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const packageJson = require('./package.json')

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /(node_modules|browser_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },

    resolve: {
        plugins: [new TsconfigPathsPlugin({})],
        alias: {
            ...packageJson._moduleAliases
        }
    },

    output: {
        path: './dist',
        filename: 'index.js',
        libraryTarget: 'umd'
    }
}
