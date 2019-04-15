const express = require('express');
const memberService = require('./member.service');
const authorize = require('_helpers/authorize');
const router = express.Router();

// Routes
router.post('/register', memberRegister);

module.exports = router;

function memberRegister(req, res, next) {
    const id = parseInt(req.params.id);
    memberService.create(id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}