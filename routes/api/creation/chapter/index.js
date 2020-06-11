const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../../../middlewares/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Book = require('../../../../models/Book');
const Genre = require('../../../../models/Genre');
const Chapter = require('../../../../models/Chapter');

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
        const {book, name, content, price} = req.body;
        if (!book || !name || !content) {
            return res.status(400).json({errors: {msg: 'Invalid chapter creation'}});
        }

        const _book = await Book.findById(book);
        if (!_book || !_book.author || !_book.author.equals(req.user.id)) {
            return res.status(400).json({errors: [{msg: 'Cannot create chapter'}]});
        }
        
        let number = await Chapter.find({book: book}).countDocuments();
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


module.exports = router;