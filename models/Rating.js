const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: false
    },
    book: {
        type: Schema.Types.ObjectId, 
        ref: 'book',
        required: true,
        unique: false
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    }
}, {timestamps: true}); // timestamps add {createdAt: Date, updatedAt: Date}

RatingSchema.index({user: 1, book: 1}, {unique: true});

module.exports = Rating = mongoose.model('rating', RatingSchema, 'rating');