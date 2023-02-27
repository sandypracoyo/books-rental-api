const express = require('express');
const router = express.Router();
const { login, signUp, deleteUser } = require('./controller');

router
    .post('/login', login)
    .post('/signup', signUp)
    .delete('/:id', deleteUser)

module.exports = router;
