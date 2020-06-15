import axios from 'axios';
import {
    GET_BOOKS_SUCCESS, 
    GET_BOOKS_FAIL,
    LOAD_GENRES_SUCCESS,
    LOAD_GENRES_FAIL
} from './types';

//Get list of books

export const loadBookBy = (genres, status) => async dispatch => {
    try {
        const res = await axios.get('api/books', {
            params: {
                genres: genres,
                status: status,
                sortBy: 'alphabet'
            }
        });
        dispatch({
            type: GET_BOOKS_SUCCESS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: GET_BOOKS_FAIL
        });
    }
}

export const loadGenres = () => async dispatch => {
    try {
        const res = await axios.get('api/genres');
        dispatch({
            type: LOAD_GENRES_SUCCESS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: LOAD_GENRES_FAIL
        })
    }
}
 