const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Request = db.Request;

async function getAll() {
    return await Request.find().select('-hash');
}