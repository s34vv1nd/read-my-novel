const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middlewares/auth');
const getBookById = require('../../middlewares/getBookById');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Book = require('../../models/Book');
const Library = require('../../models/Library');
const Chapter = require('../../models/Chapter');

// @route   GET api/libray
// @desc    Get books from  user's library
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const libraryInstances = await Library.find({user: req.user.id});
        const ids = libraryInstances.map(x => x.book);
        const books = await Book.find().where('_id').in(ids).exec();
        res.status(200).json(books);
        /*
            res.data = books = [{Book}]
        */
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error when get user library');
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
router.post('/', auth, getBookById, async (req, res) => {
    try {
        const bookid = req.book.id;
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

        let libraryInstance2 = await Library.findById(libraryInstance.id).populate('user', ['-password']).populate('book');

        res.status(201).json(libraryInstance2);
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

// @route   PATCH api/library
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
router.patch('/', auth, getBookById, async (req, res) => {
    try {
        const bookid = req.book.id;
        const userid = req.user.id;
        const chapnum = req.body.book.chapter;
        const filter = {book: bookid, user: userid};

        const libraryInstance = await Library.findOne(filter);
        if (!libraryInstance) {
            return res.status(400).json({error: 'Book not in library', success: false});
        }
        const countChapters = await Chapter.find({book: bookid}).countDocuments();
        if (!Number.isInteger(chapnum) || chapnum > countChapters || chapnum < 0) {
            return res.status(400).json({error: 'Invalid chapter', success: false});
        }
        const newlibraryInstance = await Library.findOneAndUpdate(filter, {bookmark: chapnum}, {new: true});
        res.status(200).json({newlibraryInstance, success: true});
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error when update bookmark');
    }
})

// @route   DELETE api/library
// @desc    Delete 1 book from user's library
// @access  Private
/*
    req.body: {
        book: {
            id
        }
    }
*/
router.delete('/', auth, getBookById, async (req, res) => {
    try {
        const libraryInstance = await Library.findOne({user: req.user.id, book: req.book.id});
        if (!libraryInstance) {
            return res.status(400).json({error: 'Book not in library', success: false});
        }
        await Library.deleteOne({user: req.user.id, book: req.book.id});
        res.status(200).json({
            success: true
        })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error when delete book from user library');
    }
})

module.exports = router;