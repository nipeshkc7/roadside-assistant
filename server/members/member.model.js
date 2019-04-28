const mongoose = require('mongoose');
const User = require('users/user.model');
const Schema = mongoose.Schema;

// Member schema inherits the attributes and options from the User Schema
const memberSchema = User.discriminator('Member', new Schema({
    membershipType: { type: String, enum: ['Subscription', 'Per-service'], required: true },
    expirationDate: { type: Date, default: null }
}));

module.exports = mongoose.model('Member');