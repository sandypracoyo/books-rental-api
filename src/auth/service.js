const database = require('./database');

const getUserByUsername = (username) => {
    return database.findByName(username);
}

const saveRefreshToken = (id, refreshToken) => {
    console.log(refreshToken);
    console.log(id);
    return database.saveRefreshToken(id, refreshToken)
}

module.exports = {
    getUserByUsername,
    saveRefreshToken
}