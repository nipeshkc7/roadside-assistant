const mongoose = require('mongoose');
const User = require('users/user.model');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    cardNumber: { type: Number, required: true },
    expDate: { type: String, required: true },
    CVV: { type: Number, required: true }
});

// Member schema inherits the attributes and options from the User Schema
const memberSchema = User.discriminator('Member', new Schema({
    membershipType: { type: String, enum: ['Subscription', 'Per-service'], required: true },
    expirationDate: { type: Date, default: null },
    creditCard: { type: [cardSchema], select: false } // Credit Card details are not fetched when a query is made unless explicitly said
}));

module.exports = mongoose.model('Member');