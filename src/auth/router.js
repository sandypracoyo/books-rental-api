const express = require('express');
const router = express.Router();
const { login, register, deleteUser } = require('./controller');

router
    .post('/login', login)
    .post('/register', register)
    .delete('/:id', deleteUser)

module.exports = router;
