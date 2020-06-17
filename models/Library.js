const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LibrarySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: false
    },
    book: {
        type: Schema.Types.ObjectId, 
        ref: 'book',
        require: true,
        unique: false
    },
    bookmark: {
        type: Number, 
        default: 0
    },
    bookmark_id: {
        type: Schema.Types.ObjectId,
        ref: 'chapter'
    }
}, {timestamps: true}); // timestamps add {createdAt: Date, updatedAt: Date}

LibrarySchema.index({user: 1, book: 1}, {unique: true});

module.exports = Library = mongoose.model('library', LibrarySchema, 'library');