var express = require('express');
var loginContoller = require('../controllers/login');
var router = express.Router();

router.post('/', loginContoller.loginPost);






module.exports = router; // se exporta para que se pueda usar en otro lado