const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/authentication');
const { validateLogin } = require('../../middlewares/validation');
const { logIncoming } = require('../../utils/log');
const { login, refreshToken, logout } = require('./controller');

router
    .post('/login', logIncoming, validateLogin, login)
    .post('/logout', logIncoming, auth, logout)
    .get('/refreshToken', logIncoming, refreshToken)

module.exports = router;
