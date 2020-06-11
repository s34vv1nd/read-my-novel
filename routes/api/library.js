const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middlewares/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Book = require('../../models/Book');
const Library = require('../../models/Library');

// @route    POST api/library
// @desc     Put 1 book into user's library
// @access   Private
/*
request: req.body{
    book: {
        id/name
    }
}
*/
router.post('/', auth, async (req, res) => {
    try {
        let book = req.body.book;
        book = {
            ...book,
            id: book.id || await Book.findOne({ 'name': book.name }).select('id').exec()
        }

        if (!book.id) {
            return res.status(400).json({ error: { msg: 'This book does not exist' } });
        }

        const bookid = book.id.id || book.id._id || book.id;
        const userid = req.user.id;

        const bookofid = await Book.findById(bookid).select('name');
        if (!bookofid) {
            return res.status(400).json({ error: { msg: 'This book does not exist' } });
        }
        if (bookofid.name !== book.name) {
            return res.status(400).json({ error: { msg: 'Book name and id does not match' } });
        }

        let libraryInstance = await Library.findOne({ user: userid, book: bookid }).exec();
        if (libraryInstance) {
            return res.status(400).json({ error: { msg: 'This book is already in library' } });
        }

        libraryInstance = new Library({
            user: userid,
            book: bookid
        });

        await libraryInstance.save();
        console.log(libraryInstance);

        let libraryInstance2 = await Library.findById(libraryInstance.id).populate('user', ['-password']).populate('book');

        res.status(201).json(libraryInstance2);
        /*
            res.data: {
                _id,
                user,
                book,
                bookmark: 0,
                date_created
            }
         */
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;