var newWebpackMiddle = require('webpack-express-middleware')
var config = require('./webpack.config.js')
var compiler = require('webpack')(config)
var express = require('express')
var colors = require('colors')
var path = require('path')
var ip = require('ip')
var app = express()

app.set('port', process.env.PORT || 80);

const webpack = newWebpackMiddle(compiler, config);
webpack(app)

app.use('*', express.static(__dirname + '/src/static'))

app.get('*', (req, res) => {
  // send the html file
  res.sendFile(__dirname + '/src/index.html')
  console.log('[' + 'OK'.green + ']' + ' GET request was received and served!')
})

app.listen(app.get('port'), webpack.listen, function() {
  console.log('[' + 'OK'.green + ']' + 'WebApp listening on port: ' + ip.address())
})
