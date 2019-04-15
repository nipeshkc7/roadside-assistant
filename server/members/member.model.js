const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    memberID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    membershipType: { type: String, enum: ['subscription', 'per-service'], required: true },
    expirationDate: { type: Date, default: null }
});

memberSchema.set('toJSON', { virtuals: true });

// Exports member schema to mongodb
module.exports = mongoose.model('Member', memberSchema);