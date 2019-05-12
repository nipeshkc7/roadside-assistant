const express = require('express');
requestService = require('./request.service');
const router = express.Router();

// Routes
router.get('/', getAll);
router.post('/get-in-area', getInArea);
router.get('/:id', getById);
router.put('/:id', update);
router.get('/not-completed', getNotCompleted);
router.post('/makeRequest', makeRequest);
router.get('/responders/:id', getResponders);
router.get('/member/:memberID', getMembersRequests);

module.exports = router;

function makeRequest(req, res, next) {
    requestService.create(req.body)
        .then(request => res.json(request))
        .catch(err => next(err));
}

function update(req, res, next) {
    requestService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

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
        .then(request => request ? res.json(request) : res.sendStatus(404))
        .catch(err => next(err));
}

function getResponders(req, res, next) {
    requestService.getRequestResponders(req.params.id)
        .then(responders => res.json(responders))
        .catch(err => next(err));
}

function getMembersRequests(req, res, next) {
    requestService.getMembersRequests(req.params.memberID)
        .then(requests => res.json(requests))
        .catch(err => next(err));
}