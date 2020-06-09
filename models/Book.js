const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genre'
    }],
    chapters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chapter'
    }],
    completed: {
        type: Boolean,
        default: false
    },
    rating: Number,
    date_created: {
        type: Date,
        default: Date.now
    }
});

module.exports = Book = mongoose.model('book', BookSchema, 'book');