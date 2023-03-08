const userService = require('./service');
const bcrypt = require('bcryptjs');
const Err = require('../../utils/err');
const util = require('../../utils/utils');
const { validationResult } = require('express-validator');
const { IS_EMPTY, IS_EXIST, SUCCESS } = require('../../utils/response');

const register = (req, res, next) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            throw new Err(400, IS_EMPTY('Username or Password'), errors.array())
        }
        const { username, password } = req.body
        const salt = bcrypt.genSaltSync(10)

        const newUser = {
            username: username,
            password: bcrypt.hashSync(password, salt)
        }

        const createNewUser = userService.createNewUser(newUser);
        if(createNewUser === 'already_exist'){
            throw new Err(409, IS_EXIST(`Username ${newUser.username}`))
        }
        util.send(res, SUCCESS('Success register user !'), null);
    } catch (error) {
        next(error)
    }
}

const deleteUser = (req, res, next) => {
    try {
        const deleteUser = userService.deleteUser(req.params.id);
        if(deleteUser === 'not_found'){
            util.send(res, 401, false, 'Id user not found !', null)
            return
        }
        util.send(res, 201, true, 'Success delete data !', null);
    } catch (error) {
        next(error)
    }
}

const getAllUser = (req, res, next) => {
    try {
        const dataUser = userService.getAllUser()
        util.send(res, SUCCESS('Get data user'), dataUser);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    getAllUser,
    deleteUser
}