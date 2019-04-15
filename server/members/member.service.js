const config = require('config.json');
const db = require('_helpers/db');
const Member = db.Member;

module.exports = {
    getAll,
    getById,
    create,
    update
};

async function getAll() {
    return await Member.find().populate('memberID');
}

async function getById(id) {
    return await Member.findById(id).populate('memberID');
}

async function create(id, memberParam) {
    const member = new Member({ memberID: id }, memberParam);

    await member.save();
}

async function update(id, memberParam) {
    const member = await Member.findById(id);

    if (!member) throw 'Membership unable to be located';

    Object.assign(member, memberParam);
    await member.save();
}