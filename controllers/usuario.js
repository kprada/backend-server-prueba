var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;


var Usuario = require('../models/usuario');
var controller = {









        //========================================
        // METODO PARA OBTENER TODOS LOS USUARIOS
        //========================================
        getUsuarios: function(req, res) {
            Usuario.find({}, 'nombre apellido email fecha_nacimiento pais ciudad avatar tipo_uaurio').exec((err, usuarios) => {


                if (err) {
                    return res.status(500).json({
                        ok: true,
                        message: "error base de datos",
                        errors: err
                    });
                }


                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });

            }); //END FIND USUARIO

        }, //END GET USUARIOS






        //========================================
        // METODO PARA CREAR USUARIOS
        //========================================
        postUsuario: function(req, res) {
            var body = req.body;
            var usuario = new Usuario({
                nombre: body.nombre,
                apellido: body.apellido,
                email: body.email,
                fecha_nacimiento: body.fecha_nacimiento,
                pais: body.pais,
                ciudad: body.ciudad,
                avatar: body.avatar,
                tipo_usuario: body.tipo_usuario,
                password: bcrypt.hashSync(body.password, 10)
            });


            usuario.save((err, usuarioStored) => {
                if (err)
                    return res.status(400).json({
                        ok: false,
                        message: 'error al guardar',
                        errors: err
                    });

                res.status(201).json({
                    ok: true,
                    usuario: usuarioStored,
                    usuarioToken: req.usuario

                });
            });




        }, //END CREAR USUARIO

        //========================================
        // METODO PARA ACTUALIZAR USUARIOS
        //========================================

        putUsuario: function(req, res) {
            var userID = req.params.id;
            var usuarioBody = req.body;
            Usuario.findByIdAndUpdate(userID, usuarioBody, { new: true }, (err, userUpdate) => {
                if (err)
                    return res.status(500).json({
                        message: 'error para actualizar'
                    });
                if (!userUpdate)
                    return res.status(404).json({
                        message: ' no existe el usuario para actualizar'
                    });

                userUpdate.password = bcrypt.hashSync(userUpdate.password, 10);
                res.status(200).json({
                    usuario: userUpdate

                });
            });



        }, //END PUT USUARIO


        //========================================
        // METODO PARA ACTUALIZAR USUARIOS
        //========================================

        deleteUsuario: function(req, res) {
            var userID = req.params.id;
            Usuario.findByIdAndRemove(userID, (err, userDelete) => {

                if (!userDelete) {
                    return res.status(400).json({
                        ok: false,
                        message: ' no existe el usuario para eliminar',
                        errors: { message: '{no existe un suario con el id}' }

                    });
                }
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'error para eliminar'
                    });
                }
                res.status(200).json({
                    ok: true,
                    usuario: userToDelete
                });

            });
        }


    } //END CONTROLLER



module.exports = controller; // se exporta para que se pueda usar en otro lado