const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/authentication');
const { validateLogin } = require('../../middlewares/validation');
const { login, refreshToken, logout } = require('./controller');

router
    .post('/login', validateLogin, login)
    .post('/logout', auth, logout)
    .get('/refreshToken', refreshToken)

module.exports = router;
