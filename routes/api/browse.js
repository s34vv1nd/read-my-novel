const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middlewares/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Book = require('../../models/Book');
const Genre = require('../../models/Genre');
const Library = require('../../models/Library');

// @route   GET api/browse
// @desc    get books user want to browse (depending on {genre, completed/ongoing})
// @access  Public
/*
request: req.params: {
    genres: [genres]/'all'
    status: completed'/'ongoing'/'all'
    page: Number || 1
    perPage: Number || 10
    sortBy: 'alphabet'/'popularity'/'ratings'/  {future maybe: 'vote'}
}
*/
router.get('', async (req, res) => {
    
    try {
        let genres = req.query.genres || 'all';
        let status = req.query.status || 'all';
        let page = parseInt(req.query.page || 1);
        let perPage = parseInt(req.query.perPage || 10);
        let sortBy = req.query.sortBy || 'popularity'; 
        
        let query = {};
        if (genres !== 'all') {
            genres = await Genre.find({name: {"$in": genres}}).select('_id');
            query = {...query, genres: {"$in": genres}};
        }
        if (status === 'completed' || status === 'ongoing') {
            status = (status === 'completed');            
            query = {...query, completed: status};
        }

        let books = await Book.find(query)
                .populate('author', 'username')
                .populate('genres', 'name')
                .exec();

        // Default: sort books by number of user libraries have them
        let sortVal = async book => {
            return await Library.find({book: book.id}).count();
        };
        
        // Otherwise:
        switch (sortBy) {
            case 'ratings'://ratings
                sortVal = book => book.ratings;
                break;
            case 'alphabet'://alphabet of book name
                sortVal = book => book.name;
        }

        //Schwartzian_transform
        let books2 = await Promise.all(books.map(async book => [await sortVal(book), book]));
        books2.sort((a, b) => +(a[0] > b[0]) || -(a[0] < b[0]));
        books = books2.map(book => book[1]);

        //books[((page - 1)*perPage + 1) .. (page * perPage)]
        books = books.slice((page - 1)*perPage, page * perPage);

        res.status(200).json(books);
        /*
        response: res.data =
            books: [{
                _id: ObjectId,
                author: {_id: ObjectId, username: String}
                name: String,
                genres: [{_id: ObjectId, name: String}],
                completed: Boolean,
                ratings: Number,
                date_created: Date
            }]
        */
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;