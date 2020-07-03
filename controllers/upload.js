var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var fs = require('fs');
var path = require('path'); //para la imagen

var Usuario = require('../models/usuario');
var uploadController = {

        putImg: function(req, res, next) {
            var id = req.params.id;
            if (!req.files) {
                return res.status(200).json({
                    ok: false,
                    message: 'error no seleciono nada'
                });

            } //ENF IF REQFILES


            /* OBTENIENDO NOMBRE DE ARCHIVO */

            var archivo = req.files.avatar;
            var nombreCortado = archivo.name.split('.');
            var extensionArchivo = nombreCortado[nombreCortado.length - 1];

            /* EXTENSION DE ARCHIVOS VALIDAS */
            var extensionesValidas = ['jpg', 'png', 'gif'];

            if (extensionesValidas.indexOf(extensionArchivo) < 0) {
                return res.status(400).json({
                    ok: false,
                    message: 'extension no valida '
                });
            } //END IF EXTENSION VALIDA

            /* NOMBRE DE ARCHIVO POR ID */
            var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

            /* MOVER EL ARCHIVO A UN PATH  */

            var path = `./uploads/${nombreArchivo}`;

            archivo.mv(path, err => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'error en la subida del archivo'
                    });

                } //END IF
            }); //END MV

            subirImagen(id, nombreArchivo, res);







        }, //ND PUTIMG

        /* OBTENIENDO IMAGEN  */

        getImg: function(req, res, next) {
            var avatar = req.params.avatar;

            var pathImagen = path.resolve(__dirname, `../uploads/${avatar}`);


            if (fs.existsSync(pathImagen)) {
                res.sendFile(pathImagen);
            } else {
                var pathNoImage = path.resolve(__dirname, '../assets/no-img.png');
                res.sendFile(pathNoImage);

            }


        }

    } //END CONTROLLER


function subirImagen(id, nombreArchivo, res) {

    Usuario.findById(id, (err, usuario) => {




        var pathViejo = './uploads/' + usuario.avatar;
        //SI EXISTE ELIMINA LA IMAGEN ANTERIOR
        if (fs.existsSync(pathViejo)) {
            fs.unlink(pathViejo);
        }

        usuario.avatar = nombreArchivo;
        usuario.save((err, usuarioActualizado) => {

            return res.status(200).json({
                ok: true,
                message: 'Imagen actualizada',
                usaurio: usuarioActualizado
            });
        });

    });



}


module.exports = uploadController;