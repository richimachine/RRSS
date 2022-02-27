const express = require('express');
const config = require('./server/config.js');

// Database
require('./database.js');

const app = config(express());

// Arranque de servidor
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});