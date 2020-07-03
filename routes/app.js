var express = require('express');
var app = express();

app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        message: "peticion realizada desde un archivo aparte"
    });
});


module.exports = app; // se exporta para que se pueda usar en otro lado