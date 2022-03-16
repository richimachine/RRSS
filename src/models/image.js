const mongoose = require('mongoose');
const path = require('path');
const { Schema, model } = mongoose; 
const conn = mongoose.createConnection('mongodb://localhost/storysharedb');

const ImageSchema = new Schema({
    title: { type: String },
    description: { type: String },
    filename: { type: String},
    uniqueID: {type: String},
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timeStamp: { type: Date, default: Date.now }
    
});


    module.exports = mongoose.model('Image', ImageSchema);
