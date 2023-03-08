require('dotenv').config({ path: '.env' });
const bcrypt = require('bcryptjs');
const util = require('../../utils/utils');
const jwt = require('jsonwebtoken');
const userService = require('./service');
const Err = require('../../utils/err');
const { SUCCESS, IS_EMPTY, IS_FALSE } = require('../../utils/response');
const { validationResult } = require('express-validator');
const { REFRESH_TOKEN_SECRET_KEY } = process.env

exports.login = (req, res, next) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            throw new Err(400, IS_EMPTY('Username or Password'), errors.array())
        }
        const { username, password } = req.body

        const user = userService.getUserByUsername(username);

        if(!user){
            throw new Err(404, IS_FALSE('Username'), null)
        }

        if(!bcrypt.compareSync(password, user.password)){
            throw new Err(404, IS_FALSE('Password'), null)
        }

        const token = util.generateToken(user);
        userService.saveRefreshToken(user.idUser, token.refreshToken);

        util.send(res, SUCCESS('Success login !'), token);
    } catch (error) {
        next(error)
    }
}

exports.refreshToken = (req, res) => {
    try {
        const { refreshToken } = req.body
        if(!refreshToken){
            throw new Err(400, IS_EMPTY('Token'), null)
        }
    
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY, function(err, decoded){
            if(err){
                throw new Err(400, IS_FALSE('Token'), null)
            }
    
            const { id, user } = decoded
            const findRefreshToken = userService.getUserByUsername(user);
    
            if(!findRefreshToken || findRefreshToken.refreshToken !== refreshToken){
                throw new Err(400, IS_FALSE('Token'), null)
            }
    
            const token = util.refreshToken(id, user)
            util.send(res, SUCCESS('Sucess refresh token !'), { accessToken: token })
        })        
    } catch (error) {
        next(error)
    }
}

exports.logout = (req, res) => {
    try {
        const id = req.userId
        const deleteRefreshToken = userService.deleteRefreshToken(id)
        console.log(deleteRefreshToken);
        if(!deleteRefreshToken){
            throw new Err(400, 'Already logout !', null)
        }
        util.send(res, SUCCESS('Logout'), null);
    } catch (error) {
        next(error)
    }
}