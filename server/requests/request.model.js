const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    memberID: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    location: { type: String, required: true },
    problemType: { type: String, required: true }
});

requestSchema.set('toJSON', { virtuals: true });

// Exports the request schema to mongodb
module.exports = mongoose.model('Request', requestSchema);