const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
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
    admin: {
        type: Boolean
    },
    avatar: {
        type: Buffer,
        contentType: String
    },
    coin: {
        type: Number,
        default: 0,
        min: 0
    }
}, {timestamps: true}); // timestamps add {createdAt: Date, updatedAt: Date}


module.exports = User = mongoose.model('user', UserSchema, 'user');
