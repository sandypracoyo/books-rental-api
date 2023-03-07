const nanoid = require('nanoid');
const database = require('./database');

exports.addTransaction = (idUser, books) => {
    try {
        let transactionBooks = []
        books.forEach((el) => {
            const findBookData = database.findBookById(el.idBook);
            if(!findBookData){
                return 'Book id cannot find'
            }
            database.reduceBookQty(el.idBook, el.qty)
            transactionBooks.push({
                idBook: el.idBook,
                title: findBookData.title,
                qty: el.qty
            })
        });
        database.saveTransaction({
            id: nanoid(19),
            idUser: idUser,
            transaction: transactionBooks,
            isLendingActive: true,
            transactionDate: new Date()
        })
    } catch (error) {
        return error
    }
}