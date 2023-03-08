const express = require('express');
const router = express.Router();
const { validateLogin, validateRegister } = require('../../middlewares/validation');
const { logIncoming } = require('../../utils/log');
const auth = require('../../middlewares/authentication');
const { register, getAllUser } = require('./controller');

router
    .post('/', logIncoming, validateRegister, register)
    .get('/', logIncoming, auth, getAllUser)
    .put('/:idUser/assign-as-admin')

module.exports = router;