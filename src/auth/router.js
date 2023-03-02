const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/authentication');
const { login, refreshToken, logout } = require('./controller');

router
    .post('/login', login)
    .post('/logout', auth, logout)
    .get('/refreshToken', refreshToken)

module.exports = router;
