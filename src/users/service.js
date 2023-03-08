const database = require('./database');
const nanoid = require('nanoid');

const createNewUser = (newUser) => {
    const newUserCreate = {
        idUser: nanoid(18),
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

const getAllUser = () => {
    const dataUser = database.getAllUser()
    const data = dataUser.map((e) => {
        return {
            idUser: e.idUser,
            username: e.username,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt
        }
    })
    return data
}

module.exports = {
    createNewUser,
    getAllUser,
    deleteUser
}