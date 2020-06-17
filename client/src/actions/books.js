import axios from 'axios';
import {
    LOAD_BOOKS_SUCCESS, 
    LOAD_BOOKS_FAIL
} from './types';

//Get list of books

export const loadBooks = () => async dispatch => {
    try {
        const res = await axios.get('api/books', {params: {sortBy: 'popularity'}});
        dispatch({
            type: LOAD_BOOKS_SUCCESS,
            payload: res.data.books
        });
    } catch(err) {
        console.error(err);
        dispatch({
            type: LOAD_BOOKS_FAIL
        });
    }
}