const mongoose = require('mongoose')


const comments = mongoose.Schema({

    idPostArticle: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    commentedAt: {
        type: Date,
        required: true,

    }

});

module.exports = mongoose.model('comments', comments);