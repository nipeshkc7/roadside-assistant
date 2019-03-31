const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true }, // Hash is just the hashed value of the users password
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true }, // Either admin, user or driver
    dateCreated: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

// Exports the user schema to mongodb
module.exports = mongoose.model('User', schema);