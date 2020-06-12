const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../../../middlewares/auth');
const getBookById = require('../../../../middlewares/getBookById');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const deleteChapterById = require('../../utils').deleteChapterById;

const Book = require('../../../../models/Book');
const Genre = require('../../../../models/Genre');
const Chapter = require('../../../../models/Chapter');

// @route   GET api/creation/chapter
// @desc    get chapters of a book created by user
// @access  Private
/*
    req.body: {
        book: {
            id
        }
    }
*/
router.get('/', auth, getBookById, async (req, res) => {
    try {
        const chapters = await Chapter.find({ author: req.user.id, book: req.book.id });
        res.status(200).json(chapters);
        /*
            res.data = chapters: [Chapter]
        */
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error when get created chapters');
    }
})

// @route   POST api/creation/chapter
// @desc    create new chapter
// @access  Private
/*
    req.body: {
        book: id of book,
        name: name of chapter (not empty),
        content: content of chapter (not empty),
        (price: price of chapter (default: 0)) 
    }
*/
router.post('/', auth, async (req, res) => {
    try {
        const { book, name, content, price } = req.body;

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

        res.status(201).json({success: true, chapter});
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error when post chapter')
    }
})

// @route   PUT api/creation/chapter
// @desc    Update chapter's name, content, price, published (any subset of these 4 fields) by id
// @access  Private
/*
    req.body: {
        chapter: {
            id,
            (name,)
            (content,)
            (price,)
            (published)
        }
    }
*/
router.put('/', auth, async (req, res) => {
    try {
        const { id, name, content, price, published } = req.body.chapter;
        const chapter = await Chapter.findOne({ _id: id });
        if (!chapter) {
            return res.status(400).json({ error: 'Cannot find chapter', body: req.body });
        }
        
        const book = await Book.findById(chapter.book);
        if (!book.author.equals(req.user.id)) {
            return res.status(400).json({ error: 'Invalid book/author', success: false, chapter, body: req.body });
        }

        try {
            let updated_chapter = await Chapter.findByIdAndUpdate(chapter._id, { name, content, price }, { new: true, omitUndefined: true });
            if (published && !chapter[0].published) {
                updated_chapter = await Chapter.findByIdAndUpdate(chapter._id, {published, publishedAt: Date.now()}, {new: true, omitUndefined: true});
            }
            res.status(200).json({success: true, updated_chapter});
            /*
                res.data: {
                    sucess: true,
                    chapter: {...}
                }
            */
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

// @route   DELETE api/creation/chapter
// @desc    Delete chapter by id
// @access  Private
/*
    req.body: {
        chapter: {
            id
        }
    }
*/
router.delete('/', auth, async (req, res) => {
    try {
        const { id } = req.body.chapter;
        const chapter = await Chapter.findOne({ _id: id });
        if (!chapter) {
            return res.status(400).json({ error: 'Invalid chapter. Cannot delete', success: false, id, number });
        }

        // Check if user own this book
        const book = await Book.findById(chapter.book);
        if (!book.author.equals(req.user.id)) {
            return res.status(400).json({ error: 'Invalid book/author', success: false });
        }

        await deleteChapterById(chapter._id);
        return res.status(200).json({ success: 200 });
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error when delete book');
    }
})

module.exports = router;