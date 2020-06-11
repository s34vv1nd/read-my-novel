const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../../middlewares/auth');
const getBookById = require('../../../middlewares/getBookById');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Book = require('../../../models/Book');
const Genre = require('../../../models/Genre');

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
            books: [Book]
        */
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   POST api/creation
// @desc    create new book
// @access  Private
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
        let name = req.body.name;
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
            //book,
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

// @route   PUT api/creation
// @desc    Update book (name, content, genres, completed) by id
// @access  Private
/*
    req.body: {
        book: {
            id,
            (name: String,)
            (genres: [String],) // array of genres name
            (completed: Boolean) // true (if completed) | false (if ongoing)
        }
    }
*/
router.put('/', auth, getBookById, async (req, res) => {
    try {
        if (!req.book.author.equals(req.user.id)) {
            console.log(req.book._id);
            console.log(req.user.id);
            return res.status(400).json({ error: 'Invalid book', success: false });
        }
        const { name, genres, completed } = req.body.book;

        if (name !== undefined)
            if (name === "" || name === null) {
                return res.status(400).json({ error: 'Book name cannot be empty', success: false });
            }

        let genres_id;
        if (genres !== undefined) {
            if (genres === null || genres == 0) {
                return res.status(400).
                    json({ error: 'Genres cannot be empty', success: false });
            }
            genres_id = await Genre.find().where('name').in(genres).select('id').exec();
            if (genres_id.length < genres.length) {
                return res.status(400).json({ errors: 'Invalid genres.', success: false });
            }
        }

        if (completed !== undefined)
            if (typeof completed !== 'boolean') {
                return res.status(400).json({ error: 'Invalid status', success: false });
            }

        try {
            let book = Book.findByIdAndUpdate(req.book.id, { name, genres: genres_id, completed }, { new: true, omitUndefined: true });
            book = await book.populate('genres');
            res.status(200).json(book);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: 'Update book fail', success: false });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error when update book' });
    }
})

router.use('/chapter', require('./chapter'));

module.exports = router;