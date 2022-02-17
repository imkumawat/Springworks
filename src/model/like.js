const mongoose = require('mongoose')


const like = mongoose.Schema({

    idPostArticle: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true
    },

    likedAt: {
        type: Date,
        required: true,

    }

});

module.exports = mongoose.model('like', like);