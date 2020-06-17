const express = require('express');
const router = express.Router({mergeParams: true});
const auth = require('../../../../middlewares/auth');
const findBookById = require('../../../../middlewares/book').findBookById;

const Book = require('../../../../models/Book');
const Genre = require('../../../../models/Genre');
const Review = require('../../../../models/Review');
const { model } = require('../../../../models/Book');

// @route   GET api/books/:bookid/reviews?user=:userid
// @desc    get reviews of a book
// @access  Public
/*
    const res = await axios.get('api/books/' + bookid + '/reviews', {
        params: {
            user: userid,
        }
    })
*/
router.get('/', findBookById, async (req, res) => {
    try {
        const book = req.params.bookid;
        const user = req.query.user;
        let filter = {};
        if (book) filter = {book};
        if (user) filter = {...filter, user}
        const reviews = await Review.find(filter)
            .populate('user', 'username')
            .populate('book', 'name');
        res.status(200).json({reviews, success: true});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server Error when get reviews', success: false});
    }
});

// @route   GET api/books/:bookid/reviews/:reviewid
// @desc    get a review of a book
// @access  Public
/*
    const res = await axios.get('api/books/' + bookid + '/reviews/' + reviewid)
*/
router.get('/:reviewid', findBookById, async (req, res) => {
    try {
        const book = req.params.bookid;
        const reviewid = req.params.reviewid;
        const review = await Review.findOne({_id: reviewid, book})
            .populate('user', 'username')
            .populate('book', 'name');
        if (!review) {
            res.status(400).json({error: 'Cannot find review', success: false});        
        }
        res.status(200).json({review, success: true});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server Error when get review', success: false});
    }
});

// @route   POST api/books/:bookid/reviews
// @desc    Write review for a book
// @access  Private
/*
    const res = await axios.post('api/books/' + bookid + '/reviews', {
        content: String
    })
*/
router.post('/', auth, async (req, res) => {
    try {
        const user = req.user.id;
        const book = req.params.bookid;
        const {content} = req.body;
        const review = new Review({
            user, book, content
        })
        await review.save(null, async (err, doc) => {
            res.body = await doc.populate('user', 'username').populate('book', 'name').execPopulate();
        });
        return res.status(201).json({review: res.body, success: true});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server Error when post reviews', success: false});
    }
})

// @route   PUT api/books/:bookid/reviews/:reviewid
// @desc    Edit reviews
// @access  Private
/*
    res = await axios.put('api/books/' + bookid + '/reviews/' + reviewid, {
        content: String
    });
*/
router.put('/:reviewid', auth, async (req, res) => {
    try {
        const {reviewid} = req.params;
        const review = await Review.findById(reviewid);
        if (!review) {
            return res.status(400).json({error: 'Invalid reviewid', success: false});
        }
        const newreview = await Review.findOneAndUpdate({_id: reviewid}, {content: req.body.content}, {new : true});
        return res.status(201).json({review: newreview, success: true});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server Error when post reviews', success: false});
    }
})

// @route   DELETE api/books/:bookid/reviews/:reviewid
// @desc    delete a review of a book
// @access  Public
/*
    const res = await axios.delete('api/books/' + bookid + '/reviews/' + reviewid)
*/
router.delete('/:reviewid', findBookById, async (req, res) => {
    try {
        const book = req.params.bookid;
        const reviewid = req.params.reviewid;
        if (!await Review.deleteOne({_id: reviewid, book}).ok) {
            res.status(400).json({error: 'Cannot find review', success: false});
        }
        res.status(200).json({success: true});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server Error when delete review', success: false});
    }
});

module.exports = router;