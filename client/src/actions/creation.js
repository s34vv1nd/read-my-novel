import axios from 'axios';
import { setAlert } from './alert';
import {
    CREATE_SUCCESS,
    CREATE_FAIL,
    GET_CREATED_BOOKS_SUCCESS,
    GET_CREATED_BOOKS_FAIL,
    CREATE_CHAPTER_SUCCESS,
    CREATE_CHAPTER_FAIL,
    UPDATE_CHAPTER_SUCCESS,
    UPDATE_CHAPTER_FAIL
} from './types';
import { loadChapter } from './book';

// get book created by current user
export const getBooksCreated = (userid) => async dispatch => {
    try {
        let data;
        if (!userid) data = []; else {
            const res = await axios.get('api/books', {
                params: {
                    author: userid
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
        const errors = err.response.data.error;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: CREATE_FAIL
        });
    }
}

// create a new chapter
export const createChapter = ({bookid, name, content, price}) => async dispatch => {
    try {
        const res = await axios.post('api/books/' + bookid + '/chapters', {
            name, content, price            
        });
        console.log(res.data);
        if (res.data.success) {
            dispatch({
                type: CREATE_CHAPTER_SUCCESS,
                payload: res.data.chapter   // ko can thiet
            })
        }
        else {  
            dispatch({
                type: CREATE_CHAPTER_FAIL,
            })
        }
    }
    catch (err) {
        console.log(err)
        dispatch({
            type: CREATE_CHAPTER_FAIL
        })
    }
}