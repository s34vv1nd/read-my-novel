const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    coin: {
        type: Number,
        default: 0,
        min: 0
    },
    books_created: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'book'}
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema, 'user');
