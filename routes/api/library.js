const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middlewares/auth');
const findBookById = require('../../middlewares/book').findBookById;
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Book = require('../../models/Book');
const Library = require('../../models/Library');
const Chapter = require('../../models/Chapter');

// @route   GET api/library?bookid=
// @desc    Get books from  user's library
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const book = req.query.bookid;
        const filter = {user: req.user.id};
        if (book) filter.book = book;
        const libraryInstances = await Library.find(filter);
        const ids = libraryInstances.map(x => x.book);
        
        const books = await Book.find().where('_id').in(ids)
            .populate('genres', 'name')
            .populate('author', 'username');
        return res.status(200).json({books, success: true});
        /*
            res.data = books = [{Book}]
        */
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).send('Server Error when get user library');
    }
})

// @route   POST api/library
// @desc    Put 1 book into user's library
// @access  Private
/*
    req.body: {
        book: {
            id
        }
    }
*/
router.post('/', auth, async (req, res) => {
    try {
        const bookid = req.body.book.id;
        const userid = req.user.id;
        let libraryInstance = await Library.findOne({ user: userid, book: bookid }).exec();

        if (libraryInstance) {
            return res.status(400).json({ error: { msg: 'This book is already in library' } });
        }

        libraryInstance = new Library({
            user: userid,
            book: bookid
        });

        await libraryInstance.save();

        let libraryInstance2 = await Library.findById(libraryInstance.id)
            .populate('user', 'username')
            .populate('book', 'name collections');
        let newval = (libraryInstance2.book.collections += 1);
        await Book.updateOne({ _id: bookid }, { collections: newval });

        res.status(201).json({libraryInstance2, success: true});
        /*
            res.data: {
                _id,
                user,
                book,
                bookmark: 0,
            }
         */
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error when add book to user library');
    }
})

// @route   PUT api/library
// @desc    Update bookmark of 1 book from user's library
// @access  Private
/*
    req.body: {
        book: {
            id: id of the book,
            chapter: chapter.number to bookmark
        }
    }
*/
router.put('/', auth, async (req, res) => {
    try {
        const bookid = req.body.book.id;
        const userid = req.user.id;
        const chapnum = req.body.book.chapter;
        const filter = { book: bookid, user: userid };

        const libraryInstance = await Library.findOne(filter);
        if (!libraryInstance) {
            return res.status(400).json({ error: 'Book not in library', success: false });
        }
        const countChapters = await Chapter.find({ book: bookid }).countDocuments();
        if (!Number.isInteger(chapnum) || chapnum > countChapters || chapnum < 0) {
            return res.status(400).json({ error: 'Invalid chapter', success: false });
        }
        const newlibraryInstance = await Library.findOneAndUpdate(filter, { bookmark: chapnum }, { new: true });
        res.status(200).json({ newlibraryInstance, success: true });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error when update bookmark');
    }
})

// @route   DELETE api/library?bookid=
// @desc    Delete 1 book from user's library
// @access  Private
/*
    
*/
router.delete('/', auth, async (req, res) => {
    try {
        const libraryInstance = await Library.findOne({ user: req.user.id, book: req.query.bookid });
        if (!libraryInstance) {
            return res.status(400).json({user: req.user.id, book: req.query.bookid, error: 'Book not in library', success: false});
        }
        await Library.deleteOne({ user: req.user.id, book: req.query.bookid });
        const book = await Book.findById(req.query.bookid, 'collections');
        await Book.updateOne({_id: req.query.bookid}, { collections: book.collections - 1 });
        return res.status(200).json({
            success: true
        })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({error: 'Server Error when delete book from user library', success: false});
    }
})

module.exports = router;