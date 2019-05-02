const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Member = db.Member;
const Professional = db.Professional;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// Searches for the user in the database, then if exists checks the password against the stored hashed value, returns a jwt token
async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

// Gets all users except for the hash/password field (Works for all user types)
async function getAll() {
    return await User.find().select('-hash');
}

// Gets users that matches the id specified except for the hash field (Works for all user types)
async function getById(id) {
    return await User.findById(id).select('-hash');
}

/* 
Note: is able to create any user type: Admin, Member or Professional
even though they have different fields, this is due to the 'role' field being 
sent in the request which specifies which type the new user is :)
 */
async function create(userParam) {
    // Validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '"is already taken';
    }

    const user = new User(userParam);

    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    await user.save();
}

// Note: Not tested if works for all user types
async function update(id, userParam) {
    const user = await User.findById(id);

    // Validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '"is already taken';
    }

    // Hash password if entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // Copy userParam properties to user
    Object.assign(user, userParam);

    // Save to database
    await user.save();
}

// Deletes specified user from the database (Works for all user types)
async function _delete(id) {
    await User.findByIdAndRemove(id);
}