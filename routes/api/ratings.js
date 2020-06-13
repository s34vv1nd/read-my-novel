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
const Rating = require('../../models/Rating');

// @route   GET api/ratings?user=:userid&book=:bookid
// @desc    get user's ratings of a book
// @access  Public
/*
    const res = axios.get('api/ratings', {
        params: {
            (user: userid,) // if not provided, equals to current user id
            book: bookid
        }
    });
    // res.data is a number from 0 to 5 (0 is unrated)
*/
router.get('/', findBookById, async (req, res, next) => {
    try {
        const { user, book } = req.query;
        const ratings = await Rating.find({ user, book });
        res.status(200).json(ratings);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error when get rating');
    }
})

// @route   PUT api/ratings
// @desc    update the current user's rating of a book
// @access  Private
/*
    const res = axios.put('api/ratings', {
        book: bookid,
        rating: 0 -> 5
    });
    // res.data is true/false (success/failure)
*/
router.put('/', auth, findBookById, async (req, res) => {
    try {
        const book = req.book.id;
        const user = req.user.id;
        await Rating.findOneAndUpdate({book, user}, {rating: req.body.rating}, {new: true, upsert: true});
        res.status(200).send(true);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(false);
    }
})

module.exports = router;