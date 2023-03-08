const jwt = require('jsonwebtoken');
const util = require('../utils/utils');
require('dotenv').config({ path: '.env' });
const database = require('../database.json');
const { ACCESS_TOKEN_SECRET_KEY } = process.env
const { DATA_CANNOT_BLANK, TOKEN_EXPIRED, INVALID_TOKEN } = require('../utils/response');

const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        util.send(res, DATA_CANNOT_BLANK('Token'), null)
        return
    }
    jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, (err, decoded) =>{
        if(err){
            if(err.name === 'TokenExpiredError'){
                util.send(res, TOKEN_EXPIRED, null)
                return
            }
            util.send(res, INVALID_TOKEN, null)
            return
        }

        const idUser = decoded.idUser
        const findUser = database.users.find((e) => e.idUser === idUser);
        if(!findUser){
            util.send(res, INVALID_TOKEN, null);
            return
        }
        req.userId = decoded.id;
        next()
    })
}

module.exports = authentication