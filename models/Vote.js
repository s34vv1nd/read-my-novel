const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    book: {
        type: Schema.Types.ObjectId, 
        ref: 'book',
        required: true
    }
}, {timestamps: true}); // timestamps add {createdAt: Date, updatedAt: Date}

module.exports = Vote = mongoose.model('vote', VoteSchema, 'vote');