const util = require('../../utils/utils');
const path = require('path');
const bookService = require('./service');
const { SUCCESS_RETRIEVE_DATA, DATA_CANNOT_BLANK, SUCCESS, NOT_FOUND } = require('../../utils/response');

exports.getBooks = (req, res) => {
    const { page, limit } = req.query
    const dataBooks = bookService.getBooks(page, limit)
    util.send(res, SUCCESS_RETRIEVE_DATA, dataBooks);
}

exports.addBook = (req, res) => {
    const filename = req.file.filename
    const { isbn, title, sinopsis, genre, qty } = req.body

    if(!filename){
        util.send(res, DATA_CANNOT_BLANK('Filename'), null)
        return
    }

    if(!isbn){
        util.send(res, DATA_CANNOT_BLANK('Isbn'), null)
        return
    }

    if(!title){
        util.send(res, DATA_CANNOT_BLANK('Title'), null)
        return
    }

    if(!sinopsis){
        util.send(res, DATA_CANNOT_BLANK('Sinopsis'), null)
        return
    }

    if(!genre){
        util.send(res, DATA_CANNOT_BLANK('Genre'), null)
        return
    }

    if(!qty){
        util.send(res, DATA_CANNOT_BLANK('Qty'), null)
        return
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
}

exports.getImageBook = (req, res) => {
    const fileName = req.params.fileName
    res.sendFile( path.join(__dirname, '../../uploads/', fileName) )
}

exports.deleteBooks = (req, res) => {
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
}