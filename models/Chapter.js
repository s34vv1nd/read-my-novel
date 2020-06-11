const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
        unique: false
    },
    number: {
        type: Number,
        required: true,
        min: 0,
        unique: false
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
    date_published: {
        type: Date,
        default: null
    }
}, {timestamps: true});// timestamps add {createdAt: Date, updatedAt: Date}

ChapterSchema.index({book: 1, number: 1}, {unique: true});

module.exports = Chapter = mongoose.model('chapter', ChapterSchema, 'chapter');