const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/authentication');
const { register } = require('./controller');

router
    .post('/', auth, register)
    .put('/:idUser/assign-as-admin')

module.exports = router;
