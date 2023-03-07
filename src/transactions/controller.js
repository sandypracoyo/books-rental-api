const util = require('../../utils/utils');
const transactionService = require('./service');
const { DATA_CANNOT_BLANK, SUCCESS } = require('../../utils/response');

exports.transactions = (req, res) => {
    try {
        const { idUser, books } = req.body
        transactionService.addTransaction(idUser, books)
        util.send(res, SUCCESS('Path url transaction'), null);
    } catch (error) {
        next(error)
    }
}