const express = require('express');
const transactionService = require('./transaction.service');
const authorize = require('_helpers/authorize');
const router = express.Router();

// Routes
router.post('/newTransaction', authorize(), createTransaction);
router.get('/', authorize('Admin'), getAllTransactions); // Admin only route
router.get('/:username/pastTransactions', authorize(), getPastTransactions);

module.exports = router;

function createTransaction(req, res, next) {
    transactionService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllTransactions(req, res, next) {
    transactionService.getAll()
        .then(transactions => res.json(transactions))
        .catch(err => next(err));
}

function getPastTransactions(req, res, next) {
    transactionService.getUsersTransactions(req.params.username)
        .then(transactions => res.json(transactions))
        .catch(err => next(err));
}