const util = require('../../utils/utils');
const transactionService = require('./service');
const { DATA_CANNOT_BLANK, SUCCESS } = require('../../utils/response');

exports.transactions = (req, res) => {
    const { idUser, books } = req.body
    if(!idUser){
        util.send(res, DATA_CANNOT_BLANK('Id user'), null)
        return
    }
    if(!books){
        util.send(res, DATA_CANNOT_BLANK('Books'), null)
        return
    }
    const saveTransaction = transactionService.addTransaction(idUser, books);
    util.send(res, SUCCESS('Path url transaction'), null);
}