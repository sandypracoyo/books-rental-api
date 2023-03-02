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