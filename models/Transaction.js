const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    chapter: {
        type: Schema.Types.ObjectId, 
        ref: 'chapter',
        required: true
    },
    date_added: {
        type: Date, 
        default: Date.now
    }
});

module.exports = Transaction = mongoose.model('transaction', TransactionSchema, 'transaction');