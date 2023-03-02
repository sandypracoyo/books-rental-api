const database = require('../../database.json');
const { saveToDatabase } = require('../../utils/utils');

exports.findByName = (name) => {
    return database.users.find((e) => e.username === name);
}

exports.saveRefreshToken = (id, refreshToken) => {
    try {
        const findIndexUser = database.users.findIndex((e) => e.id === id);
        database.users[findIndexUser]['refreshToken'] = refreshToken
        saveToDatabase(database);
    } catch (error) {
        return error
    }
}

exports.deleteRefreshToken = (id) => {
    try {
        const findIndexUser = database.users.findIndex((e) => e.id === id)
        database.users[findIndexUser]['refreshToken'] = ''
        saveToDatabase(database)
    } catch (error) {
        return error
    }
}