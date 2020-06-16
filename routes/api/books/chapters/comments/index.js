const express = require('express');
const router = express.Router({ mergeParams: true });

const auth = require('../../../../../middlewares/auth');

const deleteCommentById = require('../../../utils/delete');

const Book = require('../../../../../models/Book');
const Chapter = require('../../../../../models/Chapter');
const Comment = require('../../../../../models/Comment');

// @route   GET api/books/:bookid/chapters/:chapid/comments?user=:userid&parent=:commentid
// @desc    get comments of a chapter
// @access  Public
/*
    const res = await axios.get('api/books/' + bookid + '/chapters/' + chapid + '/comments', {
        params: {
            user: userid,
            parent: commentid
        }
    });
    //  res.data = {
            comments: [Comment], // List of comments
            success: true
        }
*/
router.get('/', async (req, res) => {
    try {
        const chapter = req.params.chapid;
        const { user, parent } = req.query;
        let filter = { chapter };
        if (user) filter = { ...filter, user };
        if (parent) filter = { ...filter, parent };
        const comments = await Comment.find(filter)
            .populate('user', 'username')
            .populate('chapter', 'name num');
        return res.status(200).json({ comments, success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error when get comments', success: false });
    }
})

// @route   POST api/books/:bookid/chapters/:chapid/comments
// @desc    post a comment to a chapter
// @access  Private
/*
    const res = await axios.post('api/books/' + bookid + '/chapters/' + chapid + '/comments', {
        content: 
    });
*/
router.post('/', auth, async (req, res) => {
    try {
        const user = req.user.id;
        const chapter = req.params.chapid;
        const content = req.body.chapter;
        const comment = new Comment({
            user, chapter, content
        })
        await comment.save();
        return res.status(201).json({comment, success: true});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error when post comment', success: false });
    }
})

// @route   GET api/books/:bookid/chapters/:chapid/comments/:commentid
// @desc    get a comment by ID
// @access  Public
/*
    const res = await axios.get('api/books/' + bookid + '/chapters/' + chapid + '/comments/' + commentid);
    // res.data = {Comment, success}
*/
router.get('/:commentid', async (req, res) => {
    try {
        const chapter = req.params.chapid;
        const commentid = req.params.commentid;
        const comment = await Comment.findOne({ _id: commentid, chapter })
            .populate('user', 'username')
            .populate('chapter', 'name num');
        if (!comment) {
            return res.status(400).json({ error: "Can not find comment", success: false });
        }
        res.status(200).json({ comment, success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error when get comment', success: false });
    }
})

// @route   POST api/books/:bookid/chapters/:chapid/comments/:commentid
// @desc    post a reply to a comment
// @access  Private
/*
    const res = await axios.post('api/books/' + bookid + '/chapters/' + chapid + '/comments/' + commentid, {
        content: 
    });
*/
router.post('/', auth, async (req, res) => {
    try {
        const user = req.user.id;
        const chapter = req.params.chapid;
        const parent = req.params.commentid;
        const content = req.body.chapter;
        const comment = new Comment({
            user, chapter, parent, content
        })
        await comment.save();
        return res.status(201).json({comment, success: true});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error when post comment', success: false });
    }
})

// @route   PUT api/books/:bookid/chapters/:chapid/comments/:commentid
// @desc    Edit a comment of a chapter
// @access  Private
/*
    const res = await axios.put('api/books/' + bookid + '/chapters/' + chapid + '/comments/' + commentid, {
        content: 
    });
*/
router.put('/:commentid', auth, async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.commentid, {content: req.body.content});
        return res.status(201).json({comment, success: true});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error when edit comment', success: false });
    }
})

// @route   DELETE api/books/:bookid/chapters/:chapid/comments/:commentid
// @desc    delete a comment by ID
// @access  Private
/*
    const res = await axios.delete('api/books/' + bookid + '/chapters/' + chapid + '/comments/' + commentid);
*/
router.delete('/:commentid', auth, async (req, res) => {
    try {
        //await Comment.deleteOne({_id: req.params.commentid});
        await deleteCommentById(req.params.commentid);
        res.status(200).json({success: true});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server Error when delete a chapter', success: false});
    }
})

module.exports = router;