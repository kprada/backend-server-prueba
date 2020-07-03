var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;



//========================================
// VERIFICAR TOKEN POR HEADERS 
//========================================

var middleares = {

    verificarToken: function(req, res, next) {
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;


            jwt.verify(bearerToken, SEED, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        ok: true,
                        message: "Token no valido",
                        errors: err
                    });
                }

                req.usuario = decoded.usuario;
                next();
            });


        } else {
            res.status(403).json({
                message: 'token no valido jajajajja'
            });

        }

    },
}


//========================================
// VERIFICAR TOKEN POR PARAMTERO 
//========================================
/*         verificarToken: function(req, res, next) {
            var token = req.query.token;
            jwt.verify(token, SEED, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        ok: true,
                        message: "Token no valido",
                        errors: err
                    });
                }

            });

        }, */

module.exports = middleares;