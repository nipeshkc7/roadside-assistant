const express = require('express');
const userService = require('./user.service'); // Operations available to all user types
const memberService = require('../members/member.service'); // Operations available to Members specifically
const professionalService = require('../professionals/professional.service'); // Operations available to Professionals specifically
const authorize = require('_helpers/authorize');
const router = express.Router();

// Routes
router.post('/authenticate', authenticate); // Public route
router.post('/register', register); // Public route
router.get('/', authorize('Admin'), getAll); // Admin only route
router.get('/current', authorize(), getCurrent); // All registered users route
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize('Admin'), _delete); // Admin only route
router.put('/creditCard/:id', authorize('Member'), addCard); // Member only route
router.put('/bankAccount/:id', authorize('Professional'), addBankAccount); // Professional only route
router.get('/getMemberType/:id', authorize(), getMembershipType);
router.post('/:id/addReview', authorize('Member'), addReview);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const currentUser = req.user;
    const id = parseInt(req.params.id);

    // Only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== 'Admin') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function addCard(req, res, next) {//or updates
    memberService.addCard(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function addBankAccount(req, res, next) {//or updates
    professionalService.addBankAccount(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getMembershipType(req, res, next) {
    memberService.getMembershipType(req.params.id)
        .then(membershipType => membershipType ? res.json(membershipType) : res.sendStatus(404))
        .catch(err => next(err));
}

function addReview(req, res, next) {
    professionalService.addReview(req.body, req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}