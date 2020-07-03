var express = require('express');
var UsuarioController = require('../controllers/usuario');
var middlewares = require('../middlewares/middeware');


var usuario = require('../models/usuario');

var router = express.Router();







router.get('/usuarios', UsuarioController.getUsuarios);
router.post('/create-usuario', middlewares.verificarToken, UsuarioController.postUsuario);
router.put('/usuario/:id', middlewares.verificarToken, UsuarioController.putUsuario);
router.delete('/usuario/:id', middlewares.verificarToken, UsuarioController.deleteUsuario);






module.exports = router; // se exporta para que se pueda usar en otro lado