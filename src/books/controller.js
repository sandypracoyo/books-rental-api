const util = require('../../utils/utils');
const path = require('path');
const bookService = require('./service');

exports.getBooks = (req, res) => {
    const { page, limit } = req.query
    const dataBooks = bookService.getBooks(page, limit)
    util.send(res, 200, true, 'Success retrieve books', dataBooks);
}

exports.addBook = (req, res) => {
    const filename = req.file.filename
    const { isbn, title, sinopsis, genre, qty } = req.body

    if(!filename){
        res.send('file tidak boleh kosong !')
        return
    }

    if(!isbn){
        res.send('isbn tidak boleh kosong !')
        return
    }

    if(!title){
        res.send('title tidak boleh kosong !')
        return
    }

    if(!sinopsis){
        res.send('file tidak boleh kosong !')
        return
    }

    if(!genre){
        res.send('genre tidak boleh kosong !')
        return
    }

    if(!qty){
        res.send('qty tidak boleh kosong !')
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
    res.send('success')
}

exports.getImageBook = (req, res) => {
    const fileName = req.params.fileName
    res.sendFile( path.join(__dirname, '../../uploads/', fileName) )
}

exports.deleteBooks = (req, res) => {
    const{ idBook } =  req.params

    if(!idBook){
        util.send(res, 404, false, 'Id book cannot blank !', null)
        return
    }

    const deleteBook = bookService.deleteBook(idBook)
    if(deleteBook === 'not_found'){
        util.send(res, 404, false, 'Id book not found !', null)
        return
    }

    util.send(res, 201, true, 'Success delete book !', null);
}