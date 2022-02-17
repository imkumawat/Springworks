const mongoose = require('mongoose')


const userpost = mongoose.Schema({

    userName: {
        type: String,
        required: true
    },
    
    ids: {
        type: String,
        required: true
    },

    captionText: {
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

module.exports = mongoose.model('userpost', userpost);