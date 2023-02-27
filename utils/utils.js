const fs = require('fs');
const { dirname } = require('path');

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

module.exports = {
    saveToDatabase,
    send
}