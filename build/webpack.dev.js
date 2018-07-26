const merge = require('webpack-merge')
const common = require('./webpack.common.js')
// let rules = require('./rules.js')

// rules = rules.concat([
//   {
//     test: /\.s?css$/,
//     use: [
//       'style-loader',
//       'css-loader',
//       'postcss-loader',
//       'sass-loader',
//     ],
//   },
// ])

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-souce-map',
  devServer: {
    contentBase: '../dist'
  },
  // module: {
  //   rules
  // }
})