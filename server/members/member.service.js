const config = require('config.json');
const db = require('_helpers/db');
const Member = db.Member;

module.exports = {
    getAll,
    update,
    addCard
};

// Gets all members info, minus their hash
async function getAll() {
    return await Member.find().select('-hash');
}

async function update(id, memberParam) {
    const member = await Member.findById(id);

    if (!member) throw 'Membership unable to be located';

    Object.assign(member, memberParam);
    await member.save();
}

async function addCard(id, cardParam) {
    // The '+creditCard' overwrites the no selection set for the creditCard in the member model and selects it
    const member = await Member.findById(id).select('+creditCard');

    if (!member) throw 'Member not found';

    member.creditCard.push(cardParam);
    console.log(member.creditCard[0]);
}