var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

var Usuario = require('../models/usuario');
var controllerlogin = {

    loginPost: function(req, res) {
        var body = req.body;
        Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

            if (err) {
                return res.status(500).json({
                    ok: true,
                    message: "error al buscar usuario",
                    errors: err
                });
            }
            if (!usuarioDB) {
                return res.status(400).json({
                    ok: true,
                    message: "Credenciales incorrectas -email",
                    errors: err
                });
            }
            //este condicional valida que password ingresado sea igual al de la base de datos
            if (!bcrypt.compareSync(body.password, usuarioDB.password)) {

                return res.status(400).json({
                    ok: true,
                    message: "Credenciales incorrectas -password",
                    errors: err
                });
            }
            usuarioDB.password = bcrypt.hashSync(usuarioDB.password, 10);
            //CREACION DE TOKEN
            var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 });

            //RESPUESTA
            res.status(200).json({
                ok: true,
                usuario: usuarioDB,
                token: token,
                id: usuarioDB._id,
                message: 'login  post correcto',
            });
        });




    }

}

module.exports = controllerlogin;