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
            user: userid
            book: bookid
        }
    });
    // res.data is a number from 0 to 5 (0 is unrated)
*/
router.get('/', async (req, res, next) => {
    try {
        let { user, book } = req.query;
        let filter = {};
        if (user === 'current') {
            const token = req.header('x-auth-token');
            if (!token) {
                user = null;
            }
            await jwt.verify(token, config.get('jwtSecret'), async (error, decoded) => {
                if (error) {
                    user = null;
                }
                else {
                    const res = await User.findById(decoded.user.id);
                    user = res && res._id;
                }
            });
        }
        if (user) filter = { user };
        if (book) filter = { ...filter, book };
        const ratings = await Rating.find(filter)
            .populate('user', 'username')
            .populate('book', 'name')
            .sort('-createdAt');
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
router.put('/', auth, async (req, res) => {
    try {
        const book = req.body.book;
        const user = req.user.id;
        await Rating.updateOne({ book, user }, { rating: req.body.rating }, { new: true, upsert: true });
        const ratings = await Rating.find({ book }, 'rating');
        console.log(ratings);
        let num = ratings.length;
        let sum = await ratings.reduce((total, number) => total + (number.rating), 0);
        console.log(num, sum);
        await Book.updateOne({ _id: book }, { ratings: (sum / num).toFixed(1) });
        res.status(200).json({ success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Server Error when put ratings', body: req.body, success: false });
    }
})

module.exports = router;