const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../../middlewares/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Book = require('../../../models/Book');
const Genre = require('../../../models/Genre');
const Library = require('../../../models/Library');
const Chapter = require('../../../models/Chapter');
const Transaction = require('../../../models/Transaction');

// @route GET api/book/:bookid/rating

module.exports = router;