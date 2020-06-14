import axios from 'axios';
import { setAlert } from './alert';
import {
    CREATE_SUCCESS,
    CREATE_FAIL,
    GET_CREATED_BOOKS_SUCCESS,
    GET_CREATED_BOOKS_FAIL
} from './types';

// get book created by current user
export const getBooksCreated = (user) => async dispatch => {
    try {
        let data;
        if (!user) data = []; else {
            const res = await axios.get('api/books', {
                params: {
                    author: user._id
                }
            });
            data = res.data;
        }

        dispatch({
            type: GET_CREATED_BOOKS_SUCCESS,
            payload: data
        });
    }
    catch (err) {
        dispatch({
            type: GET_CREATED_BOOKS_FAIL
        });
    }
}

// create a new book
export const createBook = ({ name, genres }) => async dispatch => {
    try {
        const res = await axios.post('api/books', { name, genres });

        dispatch({
            type: CREATE_SUCCESS,
            payload: res.data
        });
        dispatch(getBooksCreated());
        dispatch(setAlert('Book created successfully!', 'success', 1000));
    }
    catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: CREATE_FAIL
        });
    }
}