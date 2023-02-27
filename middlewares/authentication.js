const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });
const { SECRET_KEY } = process.env
const database = require('../database.json');

const authentication = (req, res, next)=>{
    const headerAuthorization = req.headers.authorization;

    if(!headerAuthorization){
        return res.send('Token cannot blank !')
    }

    const token = headerAuthorization.split(' ')[1];

    jwt.verify(token, SECRET_KEY, function(err, decoded){
        if(err){
            return res.send('error verify token!');
        }
        const idUser = decoded.id
        const findUser = database.users.find((e) => e.id === idUser);
        if(!findUser){
            return res.send('incorrect token !');
        }
        req.userId = decoded.id;
        next()
    })
}

module.exports = authentication