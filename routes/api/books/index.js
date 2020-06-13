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

// @route   GET api/books
// @desc    get books user want to browse (depending on {genre, completed/ongoing})
// @access  Public
/*
request: req.params: {
    author: author's id
    genres: [genres]/'all'
    status: completed'/'ongoing'/'all'
    page: Number || 1
    perPage: Number || 10
    sortBy: 'alphabet'/'popularity'/'ratings'/  {future maybe: 'vote'}
}
*/
router.get('/', async (req, res) => {
    try {
        let author = req.query.author;
        let genres = req.query.genres || 'all';
        let status = req.query.status || 'all';
        let page = parseInt(req.query.page || 1);
        let perPage = parseInt(req.query.perPage || -1);
        let sortBy = req.query.sortBy || 'popularity';

        let query;
        if (author) query = {author: author};
        if (genres !== 'all') {
            genres = await Genre.find({ name: { "$in": genres } }).select('_id');
            query = { ...query, genres: { "$in": genres } };
        }
        if (status === 'completed' || status === 'ongoing') {
            status = (status === 'completed');
            query = { ...query, completed: status };
        }
        let books = await Book.find(query)
            .populate('author', 'username')
            .populate('genres', 'name')
            .exec();

        // Default: sort books by number of user libraries have them
        let sortVal = async book => {
            return await Library.find({ book: book.id }).countDocuments();
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
        if (perPage !== -1) books = books.slice((page - 1) * perPage, page * perPage);

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

// @route   POST api/books
// @desc    create new book
// @access  Private
/*
    const res = axios.post('api/books', {
        name: book name,
        genres: genres' names
    })
*/
router.post('/', auth, async (req, res) => {
    try {
        console.log(req.body);
        const author = req.user.id;
        const name = req.body.name;
        const genrenames = req.body.genres;
        console.log(author, name, genrenames);
        const genres = await Genre.find().where('name').in(genrenames).select('id').exec();
        if (genres.length === 0 || genres.length < genrenames.length) {
            return res.status(400).send('Invalid genres');
        }
        book = new Book({ author, name, genres });
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
        res.status(200).json(book);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Get book failed');
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
            return res.status(500).json({error: 'utils/deleteBookById failed.', success: false})
        }
        return res.status(200).json({ success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({error: 'Server Error when delete book', success: false});
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
        }
    })
    // res.data is the book after update
*/
router.put('/:bookid', auth, findBookById, async (req, res) => {
    try {
        const { name, genrenames, completed } = req.body.book;
        const genres = await Genre.find().where('name').in(genrenames).select('id').exec();
        if (genres.length === 0 || genres.length !== genrenames.length) {
            return res.status(400).send('Invalid genres');
        }
        try {
            let book = Book.findByIdAndUpdate(req.book.id, { name, genres, completed }, { new: true, omitUndefined: true });
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

const chaptersRouter = require('./chapters');
router.use('/:bookid/chapters', chaptersRouter);

module.exports = router;