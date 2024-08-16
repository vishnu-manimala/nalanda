const mongoose = require('mongoose');
const Borrow = require('./borrow.model');

const user_schema = new mongoose.Schema({

    name :{
        type:String,
        required:true
    },

    email:{
        type: String,
        required: true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    role: {
        type: String,
        enum: ['admin', 'member'],
        required: true
      },

    borrow_history: [{
        type: ObjectId, 
        ref: 'Borrow'
      }],

      createdAt:{
        type:Date,
        default:Date.now
    },

});

module.exports = mongoose.model('user',user_schema)