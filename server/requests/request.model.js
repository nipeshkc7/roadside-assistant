const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    memberID: { type: mongoose.Schema.Types.ObjectId, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    problemType: { type: String, required: true },
    plateNumber: { type: String, required: true },
    model: { type: String, required: true },
    colour: { type: String, required: true },
    room: { type: String, required: true },
    responders: { type: Array, required: false, default: [] },
    status: { type: String, enum: ['available', 'in-progress', 'completed'], required: true, default: 'available' }
});

requestSchema.set('toJSON', { virtuals: true });
requestSchema.plugin(mongooseLeanVirtuals);

// Exports the request schema to mongodb
module.exports = mongoose.model('Request', requestSchema);