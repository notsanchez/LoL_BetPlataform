const mongoose = require('mongoose')
// const validator = require('validator')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User