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