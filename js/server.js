const express = require('express')

const app = express()
const server = require('http').Server(app)
const ioServer = require('socket.io')(server)
const favicon = require('serve-favicon')

const path = require('path')
const router = require('./router')

const port = Number(process.env.CODEVIEWERPORT || 8080)

server.listen(port)

const socketCallBack = socket => {
  router(socket)
}

ioServer.on('connection', socketCallBack)

app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(favicon(path.join(__dirname, '..', 'dist', 'img', 'favicon.ico')))
app.get('/', (req, res) => {
  res.sendfile(`${__dirname}/index.html`, [], null)
})
