const { body } = require('express-validator')

exports.validateLogin = [
    body('username').not().isEmpty().withMessage('Username is empty'),
    body('password').not().isEmpty().withMessage('Password is empty')
]

exports.validateRefreshToken = [
    body('refreshToken').not().isEmpty().withMessage('Token tidak boleh kosong')
]

exports.validateAddBook = [
    body('isbn').not().isEmpty().withMessage('Isbn is empty'),
    body('title').not().isEmpty().withMessage('Title  is empty'),
    body('sinopsis').not().isEmpty().withMessage('Sinopsis is empty'),
    body('genre').not().isEmpty().withMessage('Genre is empty'),
    body('qty').not().isEmpty().withMessage('Qty is empty')
]

exports.validateTransaction = [
    
]