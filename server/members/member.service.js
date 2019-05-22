const config = require('config.json');
const db = require('_helpers/db');
const Member = db.Member;

module.exports = {
    getAll,
    update,
    addCard,
    getMembershipType,
    getCreditCardDetails
};

// Gets all members info, minus their hash
async function getAll() {
    return await Member.find().select('-hash');
}

async function getMembershipType(id) {
    const member = await Member.findById(id);

    if (!member) throw 'Member not found';

    const membershipType = member.membershipType;
    return membershipType;
}

async function update(id, memberParam) {
    const member = await Member.findById(id);

    if (!member) throw 'Member unable to be located';

    Object.assign(member, memberParam);
    await member.save();
}

// Technically this function can be used to either add or update the members credit card details (Couldn't think of a better name, if you can please let me know)
async function addCard(id, cardParam) {
    // The '+creditCard' overwrites the no selection set for the creditCard in the member model and selects it
    const member = await Member.findById(id).select('+creditCard');

    if (!member) throw 'Member not found';

    // If card details already exists update them, else push new creditCard into array
    if (member.creditCard[0]) {
        Object.assign(member.creditCard[0], cardParam);
    } else {
        member.creditCard.push(cardParam);
    }
    //console.log(member.creditCard[0]);
    await member.save();
}

async function getCreditCardDetails(id) {
    const member = await Member.findById(id).select('+creditCard');

    if (!member) throw 'Member not found';
    
    const cardDetails = member.creditCard[0];

    return cardDetails;
}