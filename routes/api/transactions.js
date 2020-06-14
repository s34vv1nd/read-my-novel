const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middlewares/auth');
const getBookById = require('../../middlewares/book');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Book = require('../../models/Book');
const Chapter = require('../../models/Chapter');
const Transaction = require('../../models/Transaction');

// @route   GET api/transactions?user=:userid&chapter=:chapterid
// @desc    get transactions between users and chapters
// @access  Public
/*
    const res = await axios.get('api/transactions', {
        params: {
            user: userid,
            chapter: chapterid
        }
    })
*/
router.get('/', async (req, res) => {
    try {
        const {user, chapter} = req.query;
        let filter = {};
        if (user) filter = {user};
        if (chapter) filter = {...filter, chapter};
        const transactions = await Transaction.find(filter);
        res.status(200).json({transactions, success: true});
    }
    catch (err) {
        console.log(err);
        res.status(500).json('Server Error when get transactions');
    }
})

// @route   POST api/transactions
// @desc    user buy a chapter
// @access  Private
/*
    const res = await axios('api/transactions', {
        chapter: chapid;
    });
*/
router.post('/', auth, async (req, res) => {
    try {
        const chapter = req.body.chapter;
        if (await Transaction.findOne({user: req.user.id, chapter})) {
            return res.status(400).json({error: 'User has already bought this chapter!', success: false});
        }

        const {price} = await Chapter.findById(chapter, 'price');
        if (price === 0) {
            return res.status(400).json({error: 'This chapter is free!'});
        }

        const {coin} = await User.findById(req.user.id, 'coin');
        if (coin < price) {
            return res.status(400).json({error: 'User do not have enough coin!'});
        }

        const transaction = new Transaction({
            user: req.user.id, 
            chapter,
            coin: price
        })
        await transaction.save();
        await User.updateOne({_id: req.user.id}, {coin: coin - price});
        return res.status(200).json({success: true});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server Error when post transaction', success: false});
    }
})

module.exports = router;