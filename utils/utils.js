const fs = require('fs');
const { dirname } = require('path');
require('dotenv').config({ path: '.env' });
const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env


const saveToDatabase = (DB) => {   
    fs.writeFileSync('database.json', JSON.stringify(DB, null, 2), { encoding: 'utf-8'});
};

const send = (res, status, success, message, data) => {
    return res.status(status).json({
        success: success,
        message: message === null ? 'Success' : message,
        data : data === null ? {} : data 
    })
}

const generateToken = (user) => {
    const token = jwt.sign({
        id : user.id,
        user: user.username
    }, ACCESS_TOKEN_SECRET_KEY, { expiresIn: '15s' });

    const refreshToken = jwt.sign({
        id: user.id, 
        user: user.username
    }, REFRESH_TOKEN_SECRET_KEY);

    return {
        accessToken : token,
        refreshToken: refreshToken
    }
}

const refreshToken = (id, user) =>{
    const token = jwt.sign({
        id: id,
        user: user
    }, ACCESS_TOKEN_SECRET_KEY, { expiresIn: '15s' })
    return token
}

module.exports = {
    saveToDatabase,
    send,
    generateToken,
    refreshToken
}