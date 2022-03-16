const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
// const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
    image_id: { type: ObjectId },
    email: { type: String},
    name: {type: String},
    comment: {type: String},
    timeStamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', CommentSchema);