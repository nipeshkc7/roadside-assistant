const mongoose = require('mongoose');
const User = require('users/user.model');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    memberID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
    comment: { type: String },
    timeStamp: { type: Date, default: Date.now }
});

const professionalSchema = User.discriminator('Professional', new Schema({
    available: { type: Boolean, default: false },
    reviews: [reviewSchema]
}));

module.exports = mongoose.model('Professional');