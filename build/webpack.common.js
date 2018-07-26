const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const rules = require('./rules.js')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    app: './src/app.js'
  },
  plugins:[
    new CleanWebpackPlugin('dist', {
      root: path.resolve(__dirname, '../')
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 10
    }),
    new HtmlWebpackPlugin({
      title: '测试服务',
      template: './src/index.html',
      inject: 'body',
      chunksSortMode: function(a, b) {
        const order = ['vendor', 'another', 'app'];
        return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
      }
    })
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: devMode ? '[name].[hash:8].js' : '[name].[chunkhash:8].js',
    chunkFilename: devMode ? '[name].[hash:8].js' : '[name].[chunkhash:8].js',
    libraryTarget: "umd"
  },
  module: {
    rules
  },
  resolve: {
    extensions: ['.js', '.ts', 'tsx', '.jsx', '.scss', '.css']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10, // 优先
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: 'runtime',
    }
  }
}