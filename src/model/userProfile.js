const mongoose = require('mongoose')

const userprofile = mongoose.Schema({

    userName: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true,

    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
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

module.exports = mongoose.model('userprofile', userprofile);