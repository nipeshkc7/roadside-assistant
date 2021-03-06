const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Request: require('../requests/request.model'),
    Member: require('../members/member.model'),
    Professional: require('../professionals/professional.model'),
    Transaction: require('../transactions/transaction.model')
};