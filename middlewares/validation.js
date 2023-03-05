const { body, check } = require('express-validator')

exports.validateLogin = [
    body('username').isLength({ min: 3 }).withMessage('Username tidak boleh kosong'),
    body('password').isLength({ min: 3 }).withMessage('Password tidak boleh kosong')
]