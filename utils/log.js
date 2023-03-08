const pjson = require('../package.json');


const jsonstr = (data) => {
    if(typeof(data) === 'object'){
        return JSON.stringify(data)
    }else{
        return data
    }
}
exports.logInfo = (data) => {
    console.log(`[INFO] (${new Date()}) - appName=${pjson.name}[${pjson.version}] - ${data}`);
}

exports.errorInfo = (data) => {
    console.log(`[ERROR] (${new Date()}) - appName=${pjson.name}[${pjson.version}] - ${data}`);
}

exports.logIncoming = (req, res, next) => {
    console.log(`[INFO] (${new Date()}) - appName=${pjson.name}[${pjson.version}] - Incoming request to ${req.path} [${req.method}] With headers={${jsonstr(req.headers)}}, params={${jsonstr(req.params)}}, query ={${jsonstr(req.query)}}, body={${jsonstr(req.body)}}`);
    next()
}