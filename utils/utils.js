require('dotenv').config({ path: '.env' });
const fs = require('fs');
const { dirname } = require('path');
const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env


exports.saveToDatabase = (DB) => {   
    fs.writeFileSync('database.json', JSON.stringify(DB, null, 2), { encoding: 'utf-8'});
};

exports.send = (res, response, data) => {
    const { status, success, message} = response
    return res.status(status).json({
        status,
        success,
        message,
        data: data ? data : {}
    })
}

exports.generateToken = (user) => {
    const token = jwt.sign({
        id : user.id,
        user: user.username
    }, ACCESS_TOKEN_SECRET_KEY, { expiresIn: '3h' });

    const refreshToken = jwt.sign({
        id: user.id, 
        user: user.username
    }, REFRESH_TOKEN_SECRET_KEY);

    return {
        accessToken : token,
        refreshToken: refreshToken
    }
}

exports.refreshToken = (id, user) =>{
    const token = jwt.sign({
        id: id,
        user: user
    }, ACCESS_TOKEN_SECRET_KEY, { expiresIn: '36h' })
    return token
}