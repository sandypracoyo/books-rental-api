const database = require('./database');
const nanoid = require('nanoid');

const getUserByUsername = (username) => {
    return database.findByName(username);
}

const createNewUser = (newUser) => {
    const newUserCreate = {
        id: nanoid(18),
        ...newUser,
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