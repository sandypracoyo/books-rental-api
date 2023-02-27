require('dotenv').config({ path: '.env' });
const jwt = require('jsonwebtoken');
const userService = require('./service');
const util = require('../../utils/utils');

const { SECRET_KEY } = process.env

const login = (req, res) => {
    const { username, password } = req.body
    const user = userService.getUserByUsername(username);

    if(!username || !password){
        util.send(res, 403, false, 'Username or Password cannot blank !', null);
        return
    }

    if(!user){
        util.send(res, 403, false, 'Username or Password is false !', null)
        return
    }

    const token = jwt.sign({id : user.id, user: user.username}, SECRET_KEY);
    const data = {
        access_token: token
    }
    util.send(res, 200, true, null, data);
}

const signUp = (req, res) => {
    const { username, password } = req.body
    if(!username || !password){
        res.send('Username or password field cannot blank !');
        return
    }
    const newUser = {
        username: username,
        password: password
    }
    try {
        const createNewUser = userService.createNewUser(newUser);
        if(createNewUser === 'already_exist'){
            util.send(res, 409, false, `Username ${newUser.username} is already exist !`, null);
            return
        }
        util.send(res, 201, true, 'Success register user !', null);
    } catch (error) {
        util.send(res, 500, false, 'Internal Server Error', null);
    }
}

const deleteUser = (req, res) => {
    const deleteUser = userService.deleteUser(req.params.id);
    if(deleteUser === 'not_found'){
        util.send(res, 401, false, 'Id user not found !', null)
        return
    }
    util.send(res, 201, true, 'Success delete data !', null);
}

module.exports = {
    login,
    signUp,
    deleteUser
}