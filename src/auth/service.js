const database = require('./database');
const nanoid = require('nanoid');

const getUserByUsername = (username, password) => {
    return database.findByName(username, password);
}

const createNewUser = (newUser) => {
    const newUserCreate = {
        ...newUser,
        id: nanoid(18),
        createdAt: new Date(),
        updatedAt : new Date()
    }
    try {
        const createNewUser = database.createNewUser(newUserCreate);
        return createNewUser;
    } catch (error) {
        throw error;
    }
}

const deleteUser = (id) => {
    return database.deleteUser(id);
}

module.exports = {
    getUserByUsername,
    createNewUser,
    deleteUser
}