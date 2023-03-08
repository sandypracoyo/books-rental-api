const express = require('express');
const router = express.Router();
const { validateLogin, validateRegister } = require('../../middlewares/validation');
const auth = require('../../middlewares/authentication');
const { register } = require('./controller');

router
    .post('/', validateRegister, register)
    .put('/:idUser/assign-as-admin')

module.exports = router;
