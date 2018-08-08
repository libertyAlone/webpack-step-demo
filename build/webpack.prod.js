const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const common = require('./webpack.common.js')
const devMode = process.env.NODE_ENV !== 'production'

const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap(merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },
  plugins: common.plugins.concat([
    new UglifyJSPlugin({
      sourceMap: true,
      cache: true,
      parallel: true
    }),
    // new OptimizeCSSAssetsPlugin({}),
    // 不再使用extracttextplugin
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash:8].css',
      chunkFilename: devMode ? '[name].css' : '[name].[contenthash:8].css'
    })
  ])
}))