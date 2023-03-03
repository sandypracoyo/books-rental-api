const util = require('../../utils/utils');
const transactionService = require('./service');

exports.transactions = (req, res) => {
    const { idUser, books } = req.body
    if(!idUser){
        util.send(res, 401, false, 'Id User cannot blank !')
        return
    }
    if(!books){
        util.send(res, 401, false, 'Books cannot blank!')
        return
    }
    const saveTransaction = transactionService.addTransaction(idUser, books);
    util.send(res, 200, true, 'path transactions', null);
}