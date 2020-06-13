import axios from 'axios';
import {
    GET_BOOK_SUCCESS, 
    GET_BOOK_FAIL,
    GET_CHAPTER_SUCCESS,
    GET_CHAPTER_FAIL,
} from './types';

//Get list of books

export const loadBook = (bookID) => async dispatch => {
    try {
        const res_book = await axios.get('api/books/' + bookID);
        const res_chapters = await axios.get('api/books/' + bookID + '/chapters');
        dispatch({
            type: GET_BOOK_SUCCESS,
            payload: {book: res_book.data, chapters: res_chapters.data}
        });
    } catch(err) {
        console.error(err);
        dispatch({
            type: GET_BOOK_FAIL
        });
    }
}

export const loadChapter = (bookID, chapID) => async dispatch => {
    try {
        const res_book = await axios.get('api/books/' + bookID);
        const res_chapter = await axios.get('api/books/' + bookID + '/chapters/' + chapID);
        dispatch({
            type: GET_CHAPTER_SUCCESS,
            payload: {book: res_book.data, chapters: [res_chapter.data]}
        });
    } catch(err) {
        dispatch({
            type: GET_CHAPTER_FAIL
        })
    }
}

