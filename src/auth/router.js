const express = require('express');
const router = express.Router();
const { login, refreshToken } = require('./controller');

router
    .post('/login', login)
    .get('/refreshToken', refreshToken)

module.exports = router;
