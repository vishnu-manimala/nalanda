const mongoose = require('mongoose')

const book_schema = new mongoose.Schema({

    title: {
        type:String,
        required: true,
    },
    
    author: {
        type:String,
        required: true,
    },

    isbn: {
        type: String,
        required: true,
    },

    publicationDate: {
        type:String,
        required: true,
    },

    genre: {
        type:String,
        required: true,
    },

    availableCopies: {
        type:Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('Book', book_schema);