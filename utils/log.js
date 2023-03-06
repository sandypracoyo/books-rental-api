const pjson = require('../package.json');

exports.logInfo = (data) => {
    console.log(`[INFO] (${new Date()}) - appName=${pjson.name}[${pjson.version}] - ${data}`);
}

exports.errorInfo = (data) => {
    console.log(`[ERROR] (${new Date()}) - appName=${pjson.name}[${pjson.version}] - ${data}`);
}