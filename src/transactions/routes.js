const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/authentication');
const { transactions } = require('./controller');

router
    .post('/', transactions)

module.exports = router;
