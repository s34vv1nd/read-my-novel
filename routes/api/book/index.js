const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../../middlewares/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Book = require('../../../models/Book');
const Genre = require('../../../models/Genre');
const Library = require('../../../models/Library');
const Chapter = require('../../../models/Chapter');
const Transaction = require('../../../models/Transaction');

router.get('/', async (req, res) => {
    try {
        res.status(400).json({errors: [{msg: 'Cannot find book'}]});
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
})

// Middleware to get book's info by bookid
const getbook = async (req, res, next) => {
    try {
        const bookid = req.params.bookid || '';
        try {
            const book = await Book.findById(bookid).populate('genres').populate('author', '-password').exec();
            req.book = book;
            next();
        }
        catch (err) {
            return res.status(400).json({errors: [{msg: 'Cannot find book'}]});
        }
    }
    catch {
        console.log(err);
        res.status(500).send('Something is wrong with getbook middleware');
    }
}

// Middleware to get book's chapterlist by bookid
const getchapterlist = async (req, res, next) => {
    try {
        const chapters = await Chapter.find({ 'book': req.params.bookid, 'published': true }, '-content').exec();
        req.chapters = chapters;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Something is wrong with getchapterlist middleware')
    }
}

// @route   GET api/book/:id
// @desc    get book's information by book.id
// @access  Public
/*
    
*/
router.get('/:bookid', getbook, getchapterlist, async (req, res) => {
    try {
        res.status(200).json({ book: req.book, chapters: req.chapters });
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
})

// Middleware to get a chapter
const getchapter = async (req, res, next) => {
    try {
        const chapter = Chapter.findOne({ 'id': req.params.chapid, 'published': true });
        if (!chapter || !chapter.book || !chapter.book.equals(req.book.id)) {
            return res.status(400).json({ errors: [{ msg: 'Cannot find chapter' }] });
        }
        req.chapter = chapter;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Something is wrong with getchapter middleware')
    }
}


// @route   GET api/book/:bookid/:chapid
// @desc    get a chapter of a book
// @access  Public  if chapter.price = 0
//          Private otherwise
/*
    
*/
router.get('/:bookid/:chapid', getbook, getchapter, async (req, res, next) => {
    try {
        const { price } = await req.chapter.select('price').exec();
        if (price == 0) {
            return res.status(200).json({
                book: req.book,
                chapter: await req.chapter.exec()
            });
        }
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}, auth, async (req, res) => {
    try {
        const userid = req.user.id;
        const chapid = req.params.chapid;
        if (await Transaction.findOne({ 'user': userid, 'chapter': chapid })) {
            return res.status(200).json({
                book: req.book,
                chapter: await req.chapter.exec()
            });
            /*
                res.data: {
                    book,
                    chapter
                }
             */
        }
        else {
            return res.status(400).json({ errors: [{ msg: 'User need to pay for chapter' }] });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
})

module.exports = router;