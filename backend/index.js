const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()

const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 80

io.on('connection', (socket) => {
    console.log(`New connection! ${socket.id}`)

    socket.on('join_room', (data) => {
        socket.join(data)
    })
})

server.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`)
})