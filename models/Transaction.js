const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: false
    },
    chapter: {
        type: Schema.Types.ObjectId, 
        ref: 'chapter',
        required: true,
        unique: false
    }
}, {timestamps: true}); // timestamps add {createdAt: Date, updatedAt: Date}

TransactionSchema.index({user: 1, chapter: 1}, {unique: true});

module.exports = Transaction = mongoose.model('transaction', TransactionSchema, 'transaction');