const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middlewares/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Book = require('../../models/Book');
const Genre = require('../../models/Genre');

// @route   GET api/creation
// @desc    get books created by current user
// @access  Private
router.get('/', auth, async (req, res) => {
    
    try {
        const books = await Book.find({ author: req.user.id })
            .populate('genres', 'name').exec();
        res.status(200).json(books);
        /*
        response: res.data
            books: [{
                _id: ObjectId,
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

// @route POST api/creation
// @desc create new book
// @access Private
/*
    req.body: {
        name,
        genres
    }
*/
router.post('/', auth, async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let author = req.user.id;
        let  name = req.body.name;
        let genres = req.body.genres;

        let book = await Book.findOne({ name: name })
        if (book) {
            return res.
                status(400).
                json({ errors: [{ msg: 'This book name is unavailable.' }] });
        }


        if (!genres || genres == 0) {
            return res.
                status(400).
                json({ errors: [{ msg: 'Genre cannot be empty.' }] });
        }

        let genres_id = await Genre.find().where('name').in(genres).select('id').exec();

        if (genres_id.length < genres.length) {
            return res.
                status(400).
                json({ errors: [{ msg: 'Invalid genres.' }] });
        }
        

        book = new Book({
            author: author,
            name: name,
            genres: genres_id,
        });

        await book.save();

        res.status(201).json({
            book: {
                name: book.name, 
                genres: genres,
                completed: book.completed,
                date_created: book.date_created
            },
            success: true,
            message: 'Book created!',
            errors: {}
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;