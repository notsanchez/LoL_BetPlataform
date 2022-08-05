const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const User = require('./models/user')
const app = express()
require('./db/mongoose')

const PORT = process.env.PORT || 80

const user = new User({name: 'dussin'})
user.save()

app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`)
})