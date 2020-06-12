const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: false
    },
    book: {
        type: Schema.Types.ObjectId, 
        ref: 'book',
        required: true
    },
    day: {
        type: Number,
        required: true,
        unique: false
    }
}, {timestamps: true}); // timestamps add {createdAt: Date, updatedAt: Date}

VoteSchema.index({user: 1, day: 1}, {unique: true});

module.exports = Vote = mongoose.model('vote', VoteSchema, 'vote');