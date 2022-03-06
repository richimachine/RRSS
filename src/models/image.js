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

// imageSchema.plugin(mongooseLeanVirtuals);

// OPCION REDUNDANTE 
//ImageSchema.virtual("uniqueID").get(function(){
//   return this.filename.replace(path.extname(this.filename), "");
// }); No funciona bien la virtualizacion, 
// por lo que creo una nueva propiedad del objeto, ademas le quita redundancia a la aplicacion.


    module.exports = mongoose.model('Image', ImageSchema);
