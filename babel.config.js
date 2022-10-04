'use strict'
/**
 babel.config.js with useful plugins.
 */
module.exports = function (api) {
    api.cache(true)
    api.assertVersion('^7.4.5')

    const presets = ['@babel/preset-typescript']

    const plugins = ['babel-plugin-macros', 'babel-plugin-styled-components']

    return {
        presets,
        plugins
    }
}
