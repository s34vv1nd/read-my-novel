const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middlewares/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Book = require('../../models/Book');
const Genre = require('../../models/Genre');
const Library = require('../../models/Library');

// @route   GET api/genres
// @desc    Get all genres
// @access  Public
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).json(genres);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error when get genres');
    }
})

module.exports = router;