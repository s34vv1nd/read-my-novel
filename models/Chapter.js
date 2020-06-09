const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
    },
    number: {
        type: Number,
        required: true,
        min: 0
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    published: {
        type: Boolean,
        default: false
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    date_published: {
        type: Date,
        default: null
    }
});

module.exports = Chapter = mongoose.model('chapter', ChapterSchema, 'chapter');