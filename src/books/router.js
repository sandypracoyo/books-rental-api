const express = require('express');
const auth = require('../../middlewares/authentication');
const router = express.Router();
const { getAllBooks } = require('./controller');

router.get('/', auth, getAllBooks);

module.exports = router