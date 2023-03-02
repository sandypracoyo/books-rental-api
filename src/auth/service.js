const database = require('./database');

exports.getUserByUsername = (username) => {
    return database.findByName(username);
}

exports.saveRefreshToken = (id, refreshToken) => {
    return database.saveRefreshToken(id, refreshToken)
}

exports.deleteRefreshToken = (id) => {
    return database.deleteRefreshToken(id)
}