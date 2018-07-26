// for webpack-dev-middleware + webpack-hot-middleware
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  noInfo: true
}))
app.use(require('webpack-hot-middleware')(compiler))

app.listen(3000, () => {
  console.log('listening on http://localhost:3000')
})