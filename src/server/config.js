const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const routes = require('../routes/index.js');
const errorHandler = require('errorhandler');

module.exports = app => {

    // Settings

    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.engine('.hbs', exphbs.engine({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers.js')
        }));

    app.set('view engine', '.hbs')
  
    // Middlewares
    app.use(morgan('dev'));
    app.use(multer({det: path.join(__dirname, '../public/upload/temp')}).single('image'));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    // routes
    routes(app);

    // Static files
    app.use('/public', express.static(path.join(__dirname, '../public'))); // El primer parametro '/public' es para acceder desde el nav.


    // errorhandlers
   if ( 'development' === app.get('env') ){
   app.use(errorHandler);
   }
    
    return app;
}