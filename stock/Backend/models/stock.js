const mongoose = require('mongoose');
const product = require('../models/product');
const Schema = mongoose.Schema;


const stocks= new mongoose.Schema({
    productId: {
        type: Number,
        ref: 'Product',
        required: true
    },
    name:{
        type:String,
        ref:'Product',
        required:true
    },
    quantity: {
        type: Number,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Stock', stocks);
