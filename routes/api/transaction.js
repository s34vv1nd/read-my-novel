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

// @route GET api/transactions?user=:userid&book=:bookid
