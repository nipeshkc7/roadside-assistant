const config = require('config.json');
const db = require('_helpers/db');
const Professional = db.Professional;

module.exports = {
    addBankAccount,
    getBankAccountDetails,
    addReview
};

// Technically this function can be used to either add or update the professionals bank account details (Couldn't think of a better name, if you can please let me know) ==> umm, Nope
async function addBankAccount(id, bankParam) {
    const professional = await Professional.findById(id).select('+bsb +accountNumber');
    
    if (!professional) throw 'Professional not found';

    Object.assign(professional, bankParam);

    //console.log(professional);
    await professional.save();
}

async function getBankAccountDetails(id) {
    const professional = await Professional.findById(id).select('+bsb +accountNumber');

    if (!professional) throw 'Professional not found';

    const bankDetails = {
        bsb: professional.bsb,
        accountNumber: professional.accountNumber
    }

    return bankDetails;
}

// Add a review for a professional
async function addReview(reviewParam, professionalId) {
    const professional = await Professional.findById(professionalId);

    if (!professional) throw 'Professional not found';
    
    professional.reviews.push(reviewParam);

    await professional.save();
}