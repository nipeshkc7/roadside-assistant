const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const Schema = mongoose.Schema;

const userOptions = {
    discriminatorKey: 'role',
    collection: 'users',
};

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true }, // Hash is just the hashed value of the users password
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now }
    }, userOptions
);

userSchema.set('toJSON', { virtuals: true });
userSchema.plugin(mongooseLeanVirtuals);

// Exports the user schema to mongodb
module.exports = mongoose.model('User', userSchema);