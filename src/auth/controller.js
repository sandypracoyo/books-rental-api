
const userService = require('./service');
const bcrypt = require('bcryptjs');
const util = require('../../utils/utils');
require('dotenv').config({ path: '.env' });
const jwt = require('jsonwebtoken');
const { REFRESH_TOKEN_SECRET_KEY } = process.env

const login = (req, res) => {
    const { username, password } = req.body
    const user = userService.getUserByUsername(username);

    if(!username || !password){
        util.send(res, 403, false, 'Username or Password cannot blank !', null);
        return
    }

    if(!bcrypt.compareSync(password, user.password)){
        util.send(res, 403, false, 'Username or Password is false !', null)
        return
    }
    const token = util.generateToken(user);
    userService.saveRefreshToken(user.id, token.refreshToken);
    util.send(res, 200, true, null, token);
}

const refreshToken = (req, res) => {
    const { refreshToken } = req.body
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY, function(err, decoded){
        if(err){
            console.log('err');
        }
        const { id, user } = decoded
        
        const token = util.refreshToken(id, user)
        util.send(res, 200, true, null, { accessToken: token })
    })
}

const logout = () => {

}

module.exports = {
    login,
    refreshToken
}