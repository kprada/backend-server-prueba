//Requires: importaciones necesarias para funcionamiento

var express = require('express');

var mongoose = require('mongoose');

//Inicializar variables
var app = express(); //definiendo servidor express

//CONEXION A LA BASE DE DATOS

mongoose.connection.openUri('mongodb://localhost:27017/usuario', (err, res) => {
    if (err) throw err;
    console.log("Base de datos: \x1b[32m%s\x1b[0m", "online ");

});


//RUTAS
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        message: "peticion realizada"
    });
})


//ESCUCHAR PETICIONES

app.listen(3700, () => {
    console.log("Express server puerto 3700: \x1b[32m%s\x1b[0m", "online ");

});