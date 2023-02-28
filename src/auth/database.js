const database = require('../../database.json');
const { saveToDatabase } = require('../../utils/utils');

const findByName = (name) => {
    return database.users.find((e) => e.username === name);
}

const saveRefreshToken = (id, refreshToken) => {
    try {
        const findIndexUser = database.users.findIndex((e) => e.id === id);
        database.users[findIndexUser]['refreshToken'] = refreshToken
        saveToDatabase(database);
    } catch (error) {
        throw { status : 500, message: 'internal server error'}
    }
}

module.exports = {
    findByName,
    saveRefreshToken
}