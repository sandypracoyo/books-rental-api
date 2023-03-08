const database = require('../../database.json');
const { saveToDatabase } = require('../../utils/utils');

const createNewUser = (newUser) => {
    const isAlreadyExist = database.users.findIndex((e) => e.username === newUser.username) > -1
    if(isAlreadyExist){
        return 'already_exist';
    }
    try {
        database.users.push(newUser);
        saveToDatabase(database);
        return newUser
    } catch (error) {
        throw { status : 500, message: 'internal server error'}
    }
}

const getAllUser = () => {
    return database.users
}

const deleteUser = (id) => {
    const findUserDelete = database.users.findIndex((e) => e.id === id);
    if(findUserDelete === -1){
        return 'not_found';
    }
    console.log(findUserDelete);
    database.users.splice(findUserDelete);
    saveToDatabase(database);
}

module.exports = {
    createNewUser,
    getAllUser,
    deleteUser
}