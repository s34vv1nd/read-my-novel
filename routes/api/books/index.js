const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../../middlewares/auth');
const findBookById = require('../../../middlewares/book').findBookById;
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const deleteBookById = require('../utils/delete').deleteBookById;

const Book = require('../../../models/Book');
const Genre = require('../../../models/Genre');
const Library = require('../../../models/Library');
const { search } = require('./reviews');

// @route   GET api/books
// @desc    get books user want to browse (depending on {genre, completed/ongoing})
// @access  Public
/*
request: req.params: {
    author: author's id
    searchStr: ''
    genres: [genres]/'all'
    status: completed'/'ongoing'/'all'
    page: Number || 1
    perPage: Number || 10
    sortBy: 'alphabet'/'ratings'/'votes'/'popularity'/'onCreated' (default: 'alphabet')
    projection: 'name'
}
*/

const findBooksBy = async ({ author, genres, status, page, perPage, sortBy, projection }) => {
    try {
        let query;
        if (author) query = { author };
        if (genres !== 'all') {
            genres = await Genre.find({ name: { "$in": genres } }).select('_id');
            query = { ...query, genres: { "$in": genres } };
        }
        if (status === 'completed' || status === 'ongoing') {
            status = (status === 'completed');
            query = { ...query, completed: status };
        }
        let books = await Book.find(query, projection)
            .populate('author', 'username')
            .populate('genres', 'name')
            .exec();
        let sortVal;
        switch (sortBy) {
            case 'ratings':
                sortVal = book => book.ratings;
                break;
            case 'votes':
                sortVal = book => book.votes;
                break;
            case 'collections':
                sortVal = book => book.collections;
                break;
            default:    // alphabet
                sortVal = book => book.name;
        }
        books.sort((a, b) => +(sortVal(a) > sortVal(b)) || -(sortVal(a) < sortVal(b)));

        //books[((page - 1)*perPage + 1) .. (page * perPage)]
        if (perPage !== -1) books = books.slice((page - 1) * perPage, page * perPage);
        return books;
    }
    catch (err) {
        throw err;
    }
}

router.get('/', async (req, res, next) => {
    try {
        let author = req.query.author;
        let genres = req.query.genres || 'all';
        let status = req.query.status || 'all';
        let page = parseInt(req.query.page || 1);
        let perPage = parseInt(req.query.perPage || -1);
        let sortBy = req.query.sortBy || 'alphabet';
        let projection = req.query.projection;

        if (author) next(); else {
            const books = await findBooksBy({ genres, status, page, perPage, sortBy, projection: req.query.projection });
            res.status(200).json({ books, success: true });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}, auth, async (req, res) => {
    try {
        let author = req.query.author;
        let genres = req.query.genres || 'all';
        let status = req.query.status || 'all';
        let page = parseInt(req.query.page || 1);
        let perPage = parseInt(req.query.perPage || -1);
        let sortBy = req.query.sortBy || 'alphabet';
        let projection = req.query.projection;
        
        if (req.user.id != author) {
            return res.status(400).json({ success: false });
        }
        const books = await findBooksBy({ 
            author, 
            genres, 
            status, 
            page, 
            perPage, 
            sortBy, 
            projection
        });
        res.status(200).json({ books, success: true });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
})

// @route   POST api/books
// @desc    create new book
// @access  Private
/*
    const res = axios.post('api/books', {
        name: book name,
        genres: genres' names,
        cover: link img,
        sypnosis: String
    })
*/
router.post('/', auth, async (req, res) => {
    try {
        const author = req.user.id;
        const name = req.body.name;
        const genrenames = req.body.genres;
        const cover = req.body.cover;
        const sypnosis = req.body.sypnosis;
        const genres = await Genre.find().where('name').in(genrenames).select('id').exec();
        if (genres.length === 0 || genres.length < genrenames.length) {
            return res.status(400).send('Invalid genres');
        }
        book = new Book({ author, name, genres, cover, sypnosis });
        await book.save();
        res.status(201).json(book);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Create book failed');
    }
})

// @route   GET api/books/:id
// @desc    get book's information by book.id
// @access  Public
/*
    const res = axios.get('api/books' + bookid);
    // res.data is the book
*/
router.get('/:bookid', findBookById, async (req, res) => {
    try {
        const book = await Book.findById(req.book._id).populate('genres').populate('author', '-password');
        res.status(200).json({ book, success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false })
    }
})

// @route   DELETE api/books/:bookid
// @desc    Delete book by id
// @access  Private
/*
    const res = await axios.delete('api/books/' + bookid);
    // res.data.success = true/false
*/
router.delete('/:bookid', auth, findBookById, async (req, res) => {
    try {
        try {
            await deleteBookById(req.book.id);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'utils/deleteBookById failed.', success: false })
        }
        return res.status(200).json({ success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Server Error when delete book', success: false });
    }
})

// @route   PUT api/books/:bookid
// @desc    Update book (name, content, genres, completed) by id
// @access  Private
/*
    const res = await axios('api/books/' + bookid, {
        book: {
            (name: String,)
            (genres: [String],) // array of genres name
            (completed: Boolean) // true (if completed) | false (if ongoing)
            (cover: String)
            (sypnosis: string)
        }
    })
    // res.data is the book after update
*/
router.put('/:bookid', auth, findBookById, async (req, res) => {
    try {
        const { name, genrenames, completed, cover, sypnosis } = req.body.book;
        const genres = await Genre.find().where('name').in(genrenames).select('id').exec();
        if (genres.length === 0 || genres.length !== genrenames.length) {
            return res.status(400).send('Invalid genres');
        }
        try {
            let book = Book.findByIdAndUpdate(
                req.book.id, 
                { name, genres, completed, cover, sypnosis }, 
                { new: true, omitUndefined: true }
            );
            book = await book.populate('genres');
            res.status(200).json(book);
        }
        catch (err) {
            console.log(err);
            res.status(400).send('Update book fail');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error when update book');
    }
})

router.use('/:bookid/chapters', require('./chapters'));
router.use('/:bookid/reviews', require('./reviews'));

module.exports = router;