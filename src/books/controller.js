const util = require('../../utils/utils');
const path = require('path');
const bookService = require('./service');
const Err = require('../../utils/err');
const { validationResult } = require('express-validator');
const { SUCCESS_RETRIEVE_DATA, DATA_CANNOT_BLANK, SUCCESS, NOT_FOUND } = require('../../utils/response');

exports.getBooks = (req, res) => {
    try {
        const { page, limit } = req.query
        const dataBooks = bookService.getBooks(page, limit)
        util.send(res, SUCCESS_RETRIEVE_DATA, dataBooks);
    } catch (error) {
        next(error)
    }
}

exports.addBook = (req, res) => {
    try {
        const filename = req.file.filename
        const { isbn, title, sinopsis, genre, qty } = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            throw new Err(400, IS_EMPTY('Some field'), errors.array())
        }
    
        const dataToSave = {
            isbn: isbn,
            title: title,
            imageAsset: `http://localhost:3000/books/image/${filename}`,
            sinopsis: sinopsis,
            genre: genre,
            qty: parseInt(qty)
        }
    
        bookService.saveBooks(dataToSave);
        util.send(res, SUCCESS('Add books'), null);
    } catch (error) {
        next(error)
    }
}

exports.getImageBook = (req, res) => {
    try {
        const fileName = req.params.fileName
        res.sendFile( path.join(__dirname, '../../uploads/', fileName) )
    } catch (error) {
        next(error)
    }
}

exports.deleteBooks = (req, res) => {
    try {
        const{ idBook } =  req.params

        if(!idBook){
            util.send(res, DATA_CANNOT_BLANK('Id book'), null)
            return
        }
    
        const deleteBook = bookService.deleteBook(idBook)
        if(deleteBook === 'not_found'){
            util.send(res, NOT_FOUND(`Id book ${idBook}`), null)
            return
        }
    
        util.send(res, SUCCESS('Delete book'), null);
    } catch (error) {
        next(error)
    }
}