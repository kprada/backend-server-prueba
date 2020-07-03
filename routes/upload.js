var express = require('express');
var app = express();
var uploadController = require('../controllers/upload');
var middlewares = require('../middlewares/middeware');

var usuario = require('../models/usuario');

var router = express.Router();




router.put('/img/:id', uploadController.putImg);
router.get('/get-image/:avatar', uploadController.getImg);








module.exports = router; // se exporta para que se pueda usar en otro lado