const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    book: {
        type: Schema.Types.ObjectId, 
        ref: 'book',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    upvote: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'user' 
        }],
        default: []
    },
    downvote: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'user' 
        }],
        default: []
    }
}, {timestamps: true}); // timestamps add {createdAt: Date, updatedAt: Date}

module.exports = Review = mongoose.model('review', ReviewSchema, 'review');