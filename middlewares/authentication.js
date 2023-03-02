const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });
const util = require('../utils/utils');
const { ACCESS_TOKEN_SECRET_KEY } = process.env
const database = require('../database.json');

const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        util.send(res, 401, false, 'Token cannot blank !', null)
        return
    }
    jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, function(err, decoded){
        if(err){
            if(err.name === 'TokenExpiredError'){
                util.send(res, 401, false, 'Token is expired !', null)
                return
            }
            util.send(res, 401, false, 'Invalid Token !', null)
            return
        }

        const idUser = decoded.id
        const findUser = database.users.find((e) => e.id === idUser);

        if(!findUser){
            util.send(res, 401, false, 'Invalid token !', null);
            return
        }
        req.userId = decoded.id;
        next()
    })
}

module.exports = authentication