const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Member = db.Member;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // Validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '"is already taken';
    }

    const user = new User({
        username: userParam.username,
        firstName: userParam.firstName,
        lastName: userParam.lastName,
        role: userParam.role,
    });

    // Hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // Save user
    await user.save();

    // If user registering is registering as a member not a professional
    if(userParam.role === "Member" && userParam.membershipType) {
        const member = new Member({
            memberID: user._id,
            membershipType: userParam.membershipType,
        });

        await member.save();
    }
}

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

    await user.save();
}

async function _delete(id) {
    await User.FindByIdAndRemove(id);
}