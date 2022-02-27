const mongoose = require('mongoose');

const { database } = require('./keys.js');

mongoose.connect(database.URI, {
    useNewUrlParser: true
})
    .then( db => console.log('DB is connected'))
    .catch(err => console.log(err)); 