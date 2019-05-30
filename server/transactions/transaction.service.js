const db = require('_helpers/db');
const Transaction = db.Transaction;

module.exports = {
    create,
    getUsersTransactions,
    getAll
};

async function create(transactionParam) {
    const transaction = new Transaction(transactionParam);

    await transaction.save();
}

async function getUsersTransactions(username) {
    return await Transaction.find().or([{ sender: username }, {receiver: username}]);
}

async function getAll() {
    return await Transaction.find({});
}