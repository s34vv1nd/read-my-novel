const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'book'
    }],
});

module.exports = Genre = mongoose.model('genre', GenreSchema, 'genre');