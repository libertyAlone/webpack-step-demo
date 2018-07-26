const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const common = require('./webpack.common.js')
// let rules = require('./rules.js')

// rules = rules.concat([
//   {
//     test: /\.s?css$/,
//     use: [
//       MiniCssExtractPlugin.loader,
//       'css-loader',
//       'postcss-loader',
//       'sass-loader'
//     ],
//   }
// ])

module.exports = merge(common, {
  mode: 'production',
  // module: {
  //   rules
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.nODE_ENV': JSON.stringify('production')
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      cache: true,
      parallel: true
    }),
    new OptimizeCSSAssetsPlugin({}),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].css'
    })
  ]
})