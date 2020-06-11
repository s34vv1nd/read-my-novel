import axios from 'axios';
import {
    GET_BOOKS_SUCCESSFUL, 
    GET_BOOKS_FAIL
} from './types';

//Get list of books
export const loadBookBy = () => async dispatch => {
    try {
        const res = await axios.get('api/browse', {
            params: {
                genres: ['Horror', 'Sci-fi'],
                status: 'all',
                page: 1,
                perPage: 3,
                sortBy: 'alphabet'
            }
        });
        dispatch({
            type: GET_BOOKS_SUCCESSFUL,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: GET_BOOKS_FAIL
        });
    }
}