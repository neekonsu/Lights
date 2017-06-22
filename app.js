var newWebpackMiddle = require('webpack-express-middleware')
var express = require('express')
var config = require('./webpack.config.js')
var compiler = require('webpack')(config)
var colors = require('colors')
var path = require('path')
var ip = require('ip')
var app = express()
var server = require('http').Server(express);
var io = require('socket.io')(server);

app.set('port', process.env.PORT || 80);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


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
