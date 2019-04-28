const express = require('express');
requestService = require('./request.service');
const router = express.Router();

// Routes
router.get('/', getAll);
router.post('/get-in-area', getInArea);
router.get('/:id', getById);
router.get('/not-completed', getNotCompleted);

module.exports = router;

function getAll(req, res, next) {
    requestService.getAll()
        .then(requests => res.json(requests))
        .catch(err => next(err));
}

function getNotCompleted(req, res, next) {
    requestService.getAllNotCompleted()
        .then(requests => res.json(requests))
        .catch(err => next(err));
}

function getInArea(req, res, next) {
    requestService.getInArea(req.body)
        .then(requests => res.json(requests))
        .catch(err => next(err));
}

function getById(req, res, next) {
    requestService.getById(req.params.id)
        .then(request => request ? res.json(requesst) : res.sendStatus(404))
        .catch(err => next(err));
}