const mongoose = require('mongoose');
const User = require('./user.model');
const Book = require('./book.model');

const borrow_schema = new mongoose.Schema({
    
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },

    book: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Book',
        required: true,
    },

    borrowDate: {
        type: Date,
        required: true,
    },

    returnDate: {
        type: Date ,
        default: null
    },
    
    returned: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('Borrow',borrow_schema);