const Book = require('../models/Book');

module.exports = async function (req, res, next) {
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
            if (!book) {
                return res.status(400).send('Book not found');
            }
            req.book = book;
            next();
        }
        catch (err) {
            res.status(400).send('Book not found');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Something is wrong with getBookById middleware');
    }
}