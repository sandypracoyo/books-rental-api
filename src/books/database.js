const database = require('../../database.json');
const { saveToDatabase } = require('../../utils/utils');

exports.saveBooks = (data) => {
    try {
        database.books.push(data)
        saveToDatabase(database)
        return data
    } catch (error) {
        return error
    }
}

exports.getBooks = (startFrom, endAt) => {
    let data = {}
    let dataBooks = []
    const totalData = database.books.length

    for (let index = startFrom; index <= endAt -1; index++) {
        dataBooks.push(database.books[index])
    }

    data.page = ''
    data.total = totalData
    data.data = dataBooks.filter((e) => e)

    return data
}

exports.deleteBook = (id) => {
    const findBookIndex = database.books.findIndex((e) => e.id === id)
    if(findBookIndex === -1){
        return 'not_found'
    }
    database.books.splice(findBookIndex)
    saveToDatabase(database)
}