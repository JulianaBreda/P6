const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const userCtrl = require('../controllers/user') //AQUI NAO TENHO CERTEZA SE EH USER OU AUTH

router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);


module.exports = router;