const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    sender: { type: String, required: true }, // Username
    receiver: { type: String, required: true }, // Username
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['credit card'], required: true, default: 'credit card' }, //* Can be expanded if more payment options are added
    for: { type: String, enum: ['service cost', 'subscription fee'] },
    requestID: { type: Schema.Types.ObjectId, required: false }, // Only needed if payment was for a service request
    timeStamp: { type: Date, default: Date.now }
})

transactionSchema.set('toJSON', { virtuals: true });
transactionSchema.plugin(mongooseLeanVirtuals);

module.exports = mongoose.model('Transaction', transactionSchema)