const mongoose = require('mongoose');
const path = require('path');
const { Schema, model } = mongoose; 
const conn = mongoose.createConnection('mongodb://localhost/storysharedb');

const ImageSchema = new Schema({
    title: { type: String },
    description: { type: String },
    filename: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timeStamp: { type: Date, default: Date.now }
});

ImageSchema.virtual('uniqueId')
    .get(function(){
        return this.filename.replace(path.extname(this.filename), '')
    })

    module.exports = mongoose.model('Image', ImageSchema);
