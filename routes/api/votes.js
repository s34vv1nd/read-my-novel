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
const Vote = require('../../models/Vote');

// @route   GET api/votes?user=:userid&book=:bookid
// @desc    get user's votes of a book
// @access  Public
/*
    const res = axios.get('api/votes', {
        params: {
            user: userid,
            book: bookid,
            days: all votes in recent days
        }
    });
    // res.data is a Vote
*/
router.get('/', async (req, res, next) => {
    try {
        const { user, book, days } = req.query;
        let filter = {};
        if (user) filter = { user };
        if (book) filter = { ...filter, book };
        if (days) {
            const oneday = 24 * 60 * 60 * 1000;
            const today = Math.floor(Date.now() / oneday);
            filter = { ...filter, day: { "$gt": today - days } };
        }
        const votes = await Vote.find(filter)
            .sort('-createdAt')
            .populate('user', 'username')
            .populate('book', 'name');
        res.status(200).json(votes);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error when get rating');
    }
})

// @route   POST api/votes
// @desc    user vote for a book
// @access  Private
/*
    const res = axios.post('api/votes', {
        book: bookid,
    });
    // res.data is true/false (success/failure)
*/
router.post('/', auth, async (req, res) => {
    try {
        const book = req.body.book;
        const user = req.user.id;
        const day = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
        const vote = new Vote({
            book, user, day
        });
        try {
            await vote.save();
        }
        catch (err) {
            console.log(err);
            return res.status(400).json({error: 'You already cast a vote today', success: false});
        }
        const { votes } = await Book.findById(book);
        await Book.updateOne({ _id: book }, { votes: votes + 1 });
        res.status(200).json({ success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ success: false });
    }
})

// @route   DELETE api/votes?voteid=
// @desc    delete a vote
// @access  Private
/*
    const res = axios.delete('api/votes', {
        params: {
            voteid: 
        }
    });
    // res.data is true/false (success/failure)
*/
router.delete('/', auth, async (req, res) => {
    try {
        const vote = req.query.voteid;
        const { book } = await Vote.findById(vote);
        await Vote.deleteOne({ _id: req.query.voteid });
        const { votes } = await Book.findById(book);
        await Book.updateOne({ _id: book }, { votes: votes - 1 });
        res.status(200).json({ success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ success: false });
    }
})

module.exports = router;