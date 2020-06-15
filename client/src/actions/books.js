import axios from 'axios';
import {
    LOAD_BOOK_SUCCESS, 
    LOAD_BOOK_FAIL,
    GET_CHAPTER_SUCCESS,
    GET_CHAPTER_FAIL,
} from './types';

//Get list of books

export const loadBooks = () => async dispatch => {
    try {
        const res = await axios.get('api/books', {params: {sortBy: 'popularity'}});
        dispatch({
            type: LOAD_BOOK_SUCCESS,
            payload: res.data.books
        });
    } catch(err) {
        console.error(err);
        dispatch({
            type: LOAD_BOOK_FAIL
        });
    }
}