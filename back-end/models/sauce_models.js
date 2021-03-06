const mongoose = require('mongoose')
const sauce = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mainPepper: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    heat: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    dislikes: {
        type: Number,
        required: true,
        default: 0
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    usersDisLiked: {
        type: [String],
        required: true,
        default: []
    },
    usersLiked: {
        type: [String],
        required: true,
        default: []
    }

})
module.exports = mongoose.model('Sauce', sauce)