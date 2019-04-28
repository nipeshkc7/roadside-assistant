const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    memberID: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    problemType: { type: String, required: true },
    plateNumber: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false }
});

requestSchema.set('toJSON', { virtuals: true });
requestSchema.plugin(mongooseLeanVirtuals);

// Exports the request schema to mongodb
module.exports = mongoose.model('Request', requestSchema);