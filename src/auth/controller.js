
const userService = require('./service');
const bcrypt = require('bcryptjs');
const util = require('../../utils/utils');
require('dotenv').config({ path: '.env' });
const jwt = require('jsonwebtoken');
const { REFRESH_TOKEN_SECRET_KEY } = process.env

exports.login = (req, res) => {
    try {
        const { username, password } = req.body

        if(!username || !password){
            util.send(res, 403, false, 'Username or Password cannot blank !', null);
            return
        }

        const user = userService.getUserByUsername(username);

        if(!user){
            util.send(res, 403, false, 'Username or password incorrect', null);
            return
        }

        if(!bcrypt.compareSync(password, user.password)){
            util.send(res, 403, false, 'Password is false !', null)
            return
        }

        const token = util.generateToken(user);
        userService.saveRefreshToken(user.id, token.refreshToken);
        util.send(res, 200, true, 'Success login', token);
    } catch (error) {
        console.log(error);
        util.send(res, 500, false, null, null);
    }
}

exports.refreshToken = (req, res) => {
    try {
        const { refreshToken } = req.body
        if(!refreshToken){
            util.send(res, 403, false, 'Token cannot blank !', null)
            return
        }
    
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY, function(err, decoded){
            if(err){
                util.send(res, 403, false, 'Token invalid !', null);
                return
            }
    
            const { id, user } = decoded
            const findRefreshToken = userService.getUserByUsername(user);
    
            if(!findRefreshToken || findRefreshToken.refreshToken !== refreshToken){
                util.send(res, 403, false, 'Token invalid !', null);
                return
            }
    
            const token = util.refreshToken(id, user)
            util.send(res, 200, true, null, { accessToken: token })
        })        
    } catch (error) {
        console.log(error);
        util.send(res, 500, false, 'Internal server error', null)
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
        util.send(res, 200, true, 'Success logout', null);
    } catch (error) {
        console.log(error);
        util.send(res, 500, false, 'Internal server error', null)
    }
}