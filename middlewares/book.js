const Book = require('../models/Book');
const Chapter = require('../models/Chapter');

const findBookById = async function (req, res, next) {
    try {
        let bookid = req.params.bookid
            || req.query.bookid
            || req.body.bookid
            || req.params.book && req.params.book.id
            || req.query.book && req.query.book.id
            || req.body.book && req.body.book.id
            || req.params.book
            || req.query.book
            || req.body.book;
            
        try {
            book = await Book.findById(bookid);
            if (!book || (req.user && !book.author.equals(req.user.id))) {
                return res.status(400).send('Book not found');
            }
            req.book = book;
            next();
        }
        catch (err) {
            console.log(err);
            res.status(400).send('Book not found');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Something is wrong with getBookById middleware');
    }
}

const findChapterById = async function (req, res, next) {
    try {
        const chapid = req.params.chapid
            || req.query.chapid
            || req.body.chapid
            || req.params.chapter && req.params.chapterid
            || req.query.chapter && req.query.chapterid
            || req.body.chapter && req.body.chapter.id
            || req.params.chapter
            || req.query.chapter
            || req.body.chapter;
            
        try {
            const chapter = await Chapter.findById(chapid);
            if (!chapter) {
                return res.status(400).send('Chapter not found');
            }
            if (req.book && !chapter.book.equals(req.book.id)) {
                return res.status(400).send('Chapter not found');
            }
            req.chapter = chapter;
            next();
        }
        catch (err) {
            console.log(err);
            res.status(400).send('Chapter not found');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Something is wrong with getChapterById middleware');
    }
}

module.exports = {
    findBookById,
    findChapterById
}