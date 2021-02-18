const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const user = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }


})
user.plugin(uniqueValidator)
module.exports = mongoose.model('user', user)