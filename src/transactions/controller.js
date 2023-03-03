const util = require('../../utils/utils');

exports.transactions = (req, res) => {
    util.send(res, 200, true, 'path transactions', null);
}