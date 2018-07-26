const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index'],
  devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: './dist',
  //   hot: true
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      title: '测试'
    }),
    // for hmr
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          },
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  }
};