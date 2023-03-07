const database = require('../../database.json');
const { saveToDatabase } = require('../../utils/utils');

exports.saveTransaction = (data) => {
    database.transactions.push(data)
    saveToDatabase(database)
}

exports.findBookById = (idBook) => {
    return database.books.find(e => e.id === idBook)
}

exports.reduceBookQty = (idBook, qty) => {
    const findIndexBook = database.books.findIndex(e => e.id === idBook)
    database.books[findIndexBook].qty -= qty
    saveToDatabase(database);
}