//Requires: importaciones necesarias para funcionamiento

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');



//Inicializar variables
var app = express(); //definiendo servidor express


//importacion de rutas

var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var uploadRoutes = require('./routes/upload');






//MIDDLEWARES
app.use(fileUpload());
/* SE EJECUTA ANTES DEEJECUTAR LA ACCION DE UNA PETICION */
//BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//CONEXION A LA BASE DE DATOS

mongoose.connection.openUri('mongodb://localhost:27017/usuarioDB', (err, res) => {
    if (err) throw err;
    console.log("Base de datos: \x1b[32m%s\x1b[0m", "online ");

});
//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});




//RUTAS
app.use('/apiRest', usuarioRoutes); //aqui se define un alias a las rutas
app.use('/login', loginRoutes); //aqui se define un alias a las rutas
app.use('/upload', uploadRoutes); //aqui se define un alias a las rutas


//ESCUCHAR PETICIONES

app.listen(3700, () => {
    console.log("Express server puerto 3700: \x1b[32m%s\x1b[0m", "online ");

});