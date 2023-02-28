const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });
const { ACCESS_TOKEN_SECRET_KEY } = process.env
const database = require('../database.json');

const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null){
        res.status(401).send('Unauthorized');
        return
    }
    jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, function(err, decoded){
        if(err){
            if(err.name === 'TokenExpiredError'){
                return res.send('Token expired')
            }
            return res.send('Verify token error !');
        }

        const idUser = decoded.id
        const findUser = database.users.find((e) => e.id === idUser);

        if(!findUser){
            return res.send('incorrect token !');
        }
        console.log(decoded);
        req.userId = decoded.id;
        next()
    })
}

module.exports = authentication