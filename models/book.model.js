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
        type:Date,
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

})

module.exports = mongoose.model('book', book_schema);