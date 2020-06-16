const Book = require('../../../models/Book');
const Chapter = require('../../../models/Chapter');
const Library = require('../../../models/Library');
const Review = require('../../../models/Review');
const Rating = require('../../../models/Rating');
const Vote = require('../../../models/Vote');
const Comment = require('../../../models/Comment');


const deleteVoteByBookId = async bookid => {
    try {
        await Vote.deleteMany({ book: bookid });
    }
    catch (err) {
        throw err;
    }
}

const deleteRatingByBookId = async bookid => {
    try {
        await Rating.deleteMany({ book: bookid });
    }
    catch (err) {
        throw err;
    }
}

const deleteReviewByBookId = async bookid => {
    try {
        await Review.deleteMany({ book: bookid });
    }
    catch (err) {
        throw err;
    }
}

const deleteLibraryByBookId = async bookid => {
    try {
        await Library.deleteMany({ book: bookid });
    }
    catch (err) {
        throw err;
    }
}

const deleteCommentById = async commentid => {
    try {
        (await Comment.find({ parent: commentid }, '_id')).forEach(async (value) => {
            await deleteCommentById(value._id);
        })
        await Comment.deleteOne({ _id: commentid });
    }
    catch (err) {
        throw err;
    }
}

const deleteCommentByChapterId = async chapid => {
    try {
        (await Comment.find({ chapter: chapid }, '_id')).forEach(async (value) => {
            await deleteCommentById(value._id);
        })
    }
    catch (err) {
        throw err;
    }
}

const deleteChapterById = async chapid => {
    try {
        await deleteCommentByChapterId(chapid);
        let chapter = await Chapter.findById(chapid, 'number');
        let number = chapter.number;
        const book = chapter.book;
        await Chapter.deleteOne({ _id: chapid });
        let nextchap;
        while (nextchap = await Chapter.findOne({book: book, number: (number + 1) })) {
            await Chapter.updateOne({ _id: nextchap._id }, { number: number });
            number += 1;
        }
    }
    catch (err) {
        throw err;
    }
}

const deleteChapterByBookId = async bookid => {
    try {
        const chapids = await Chapter.find({ book: bookid }, '_id').exec();
        chapids.forEach(async (value) => {
            await deleteChapterById(value._id);
        })
    }
    catch (err) {
        throw err;
    }
}

const deleteBookById = async bookid => {
    try {
        await deleteChapterByBookId(bookid);
        await deleteLibraryByBookId(bookid);
        await deleteReviewByBookId(bookid);
        await deleteRatingByBookId(bookid);
        await deleteVoteByBookId(bookid);
        await Book.findOneAndDelete({ _id: bookid });
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    deleteChapterById,
    deleteBookById
};