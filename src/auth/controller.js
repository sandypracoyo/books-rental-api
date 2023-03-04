const bcrypt = require('bcryptjs');
const util = require('../../utils/utils');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });
const userService = require('./service');
const { DATA_CANNOT_BLANK, INCORRECT_FIELD, FALSE_DATA, SUCCESS, INTERNAL_SERVER_ERROR, INVALID_TOKEN } = require('../../utils/response');
const { REFRESH_TOKEN_SECRET_KEY } = process.env

exports.login = (req, res) => {
    try {
        const { username, password } = req.body

        if(!username || !password){
            util.send(res, DATA_CANNOT_BLANK('Username or Password'), null);
            return
        }

        const user = userService.getUserByUsername(username);

        if(!user){
            util.send(res, INCORRECT_FIELD('Username'), null);
            return
        }

        if(!bcrypt.compareSync(password, user.password)){
            util.send(res, FALSE_DATA('Password'), null);
            return
        }

        const token = util.generateToken(user);
        userService.saveRefreshToken(user.id, token.refreshToken);

        util.send(res, SUCCESS('Success login !'), token);
    } catch (error) {
        console.log(error);
        util.send(res, INTERNAL_SERVER_ERROR, null);
    }
}

exports.refreshToken = (req, res) => {
    try {
        const { refreshToken } = req.body
        if(!refreshToken){
            util.send(res, DATA_CANNOT_BLANK('Token'), null)
            return
        }
    
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY, function(err, decoded){
            if(err){
                util.send(res, INVALID_TOKEN, null);
                return
            }
    
            const { id, user } = decoded
            const findRefreshToken = userService.getUserByUsername(user);
    
            if(!findRefreshToken || findRefreshToken.refreshToken !== refreshToken){
                util.send(res, INVALID_TOKEN, null);
                return
            }
    
            const token = util.refreshToken(id, user)
            util.send(res, SUCCESS('Sucess refresh token !'), { accessToken: token })
        })        
    } catch (error) {
        console.log(error);
        util.send(res, INTERNAL_SERVER_ERROR, null)
    }
}

exports.logout = (req, res) => {
    try {
        const id = req.userId
        const deleteRefreshToken = userService.deleteRefreshToken(id)
        console.log(deleteRefreshToken);
        if(!deleteRefreshToken){
            util.send(res, 403, false, 'Already logout !');
            return
        }
        util.send(res, SUCCESS('Logout'), null);
    } catch (error) {
        console.log(error);
        util.send(res, INTERNAL_SERVER_ERROR, null)
    }
}