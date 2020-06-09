const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LibrarySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    book: {
        type: Schema.Types.ObjectId, 
        ref: 'book'
    },
    bookmark: {
        type: Number, 
        default: 0
    },
    date_added: {
        type: Date, 
        default: Date.now
    }
});

module.exports = Library = mongoose.model('library', LibrarySchema, 'library');