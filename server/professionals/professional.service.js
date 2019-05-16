const config = require('config.json');
const db = require('_helpers/db');
const Professional = db.Professional;

module.exports = {
    addBankAccount
};

// Technically this function can be used to either add or update the professionals bank account details (Couldn't think of a better name, if you can please let me know) ==> umm, Nope 
async function addBankAccount(id, bankParam) {
    const professional = await Professional.findById(id).select('+bsb +accountNumber');
    
    if (!professional) throw 'Professional not found';

    Object.assign(professional, bankParam);

    //console.log(professional);
    await professional.save();
}