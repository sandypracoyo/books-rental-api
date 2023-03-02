const util = require('../../utils/utils');
const path = require('path');
const bookService = require('./service');

exports.getAllBooks = (req, res) => {
    util.send(res, 200, true, 'Path url getAllBooks', null);
}

exports.getBookById = (req, res) => {

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
        qty: qty
    }

    bookService.saveBooks(dataToSave);
    res.send('success')
}

exports.getImageBook = (req, res) => {
    const fileName = req.params.fileName
    res.sendFile( path.join(__dirname, '../../uploads/', fileName) )
}