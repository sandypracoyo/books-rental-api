const database = require('./database');
const nanoid = require('nanoid');

exports.saveBooks = (data) => {
    try {
        const payload = {
            id: nanoid(19),
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const saveBooks = database.saveBooks(payload)
        return saveBooks
    } catch (error) {
        return error
    }
}

exports.getBooks = (page, limit) => {
    const selectedPage = page ? page : 1
    const limitData = limit ? limit : 5
    const indexStartFrom = (selectedPage * limitData) - limitData
    const indexEndAt = (selectedPage * limitData)

    const getBooks = database.getBooks(indexStartFrom, indexEndAt)
    getBooks.page = parseInt(page)

    return getBooks
}

exports.deleteBook = (idBook) => {
    return database.deleteBook(idBook)
}