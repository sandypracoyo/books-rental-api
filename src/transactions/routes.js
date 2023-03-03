const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/authentication');
const { register } = require('./controller');

router
    .post('/', register)

module.exports = router;
