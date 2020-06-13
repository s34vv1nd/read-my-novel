const express = require('express');
const router = express.Router({mergeParams: true});

const bcrypt = require('bcryptjs');
const auth = require('../../../../middlewares/auth');
const findBookById = require('../../../../middlewares/book').findBookById;
const findChapterById = require('../../../../middlewares/book').findChapterById;
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const deleteChapterById = require('../../utils/delete').deleteChapterById;

const Book = require('../../../../models/Book');
const Chapter = require('../../../../models/Chapter');
const Transaction = require('../../../../models/Transaction');


// @route   GET api/books/:bookid/chapters
// @desc    get chapters of a book
// @access  Semi
router.get('/', findBookById, async (req, res, next) => {
    try {
        const chapters = await Chapter.find({book: req.book._id, published: true}, '-content');
        res.body = chapters;
        next();
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error when get chapters');
    }
}, auth, async (req, res) => {
    try {
        if (req.book.author.equals(req.user.id)) {
            const chapters = await Chapter.find({book: req.book._id, published: false}, '-content');
            chapters.forEach(chapter => res.body.push(chapter));
        }
        res.body.sort((a, b) => a.number - b.number);
        return res.status(200).json(res.body);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error when get chapters');
    }
})

// @route   GET api/book/:bookid/chapters/:chapid
// @desc    get a chapter of a book
// @access  Public  if chapter.price = 0
//          Private otherwise
/*
    
*/
router.get('/:chapid', findBookById, findChapterById, async (req, res, next) => {
    try {
        const {price, published} = req.chapter;
        if (price === 0 && published === true) {
            return res.status(200).json(req.chapter);
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
        if (req.book.author.equals(req.user.id) || (await Transaction.findOne({ 'user': userid, 'chapter': chapid }))) {
            return res.status(200).json(req.chapter);
        }
        else {
            return res.status(400).json({ errors: [{ msg: 'User need to pay for chapter' }], book: req.book, user: req.user });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
})

// @route   POST api/books/:bookid/chapters
// @desc    create new chapter
// @access  Private
/*
    req.body: {
        name: name of chapter (not empty),
        content: content of chapter (not empty),
        (price: price of chapter (default: 0)) 
    }
*/
router.post('/', auth, findBookById, async (req, res) => {
    try {
        const book = req.book.id;
        const { name, content, price } = req.body;

        if (!book || !name || !content) {
            return res.status(400).json({ errors: [{ msg: 'Invalid chapter creation' }], body: req.body });
        }

        const _book = await Book.findById(book);
        if (!_book || !_book.author || !_book.author.equals(req.user.id)) {
            return res.status(400).json({ errors: [{ msg: 'Cannot create chapter' }], body: req.body });
        }

        let number = await Chapter.find({ book: book }).countDocuments();
        number += 1;
        const chapter = new Chapter({
            book, number, name, content, price
        });

        await chapter.save((err) => {
            if (err) throw err;
        });

        res.status(201).json(chapter);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error when post chapter')
    }
})

// @route   PUT api/books/:bookid/chapters/:chapid
// @desc    Update chapter's name, content, price, published (any subset of these 4 fields) by id
// @access  Private
/*
    const res = await axios.put('api/book/' + bookid + '/chapters/' + chapid, {
        (name,)
        (content,)
        (price,)
        (published)
    })
    // res.data is updated chapter
*/
router.put('/:chapid', auth, findBookById, findChapterById, async (req, res) => {
    try {
        const { name, content, price, published } = req.body;
        const chapter = req.chapter;

        try {
            let updated_chapter = await Chapter.findByIdAndUpdate(chapter._id, { name, content, price }, { new: true, omitUndefined: true });
            if (published && !chapter[0].published) {
                updated_chapter = await Chapter.findByIdAndUpdate(chapter._id, {published, publishedAt: Date.now()}, {new: true, omitUndefined: true});
            }
            res.status(200).json(updated_chapter);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: 'Update book fail', success: false, body: req.body });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error when update book', body: req.body });
    }
})

// @route   DELETE api/books/:bookid/chapters/:chapid
// @desc    Delete chapter by id
// @access  Private
/*
    const res = await axios.delete('api/books/' + bookid + '/chapters/' + chapid);
    // res.data 
*/
router.delete('/:chapid', auth, findBookById, findChapterById, async (req, res) => {
    try {
        await deleteChapterById(req.chapter._id);
        return res.status(200).json({ success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error when delete book');
    }
})

module.exports = router;