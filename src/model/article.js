const mongoose = require('mongoose')


const article = mongoose.Schema({

    userName: {
        type: String,
        required: true
    },

    ids: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },

    imageText: {
        type: String,
        required: true
    },

    creationTime: {
        type: Date,
        required: true,

    }

});

module.exports = mongoose.model('article', article);