import axios from 'axios';
import {
    GET_LIBRARY_SUCCESS,
    GET_LIBRARY_FAIL,
    ADD_BOOK_SUCCESS,
    ADD_BOOK_FAIL,
    REMOVE_FROM_LIBRARY_SUCCESS,
    REMOVE_FROM_LIBRARY_FAIL,
} from './types';

export const loadLibrary = () => async dispatch => {
    try {
        const res = await axios.get('api/library');

        if (res.statusCode >= 400) {
            dispatch({
                type: GET_LIBRARY_FAIL
            })
        }
        else {
            dispatch({
                type: GET_LIBRARY_SUCCESS,
                payload: res.data
            })
        }
    }
    catch (err) {
        console.error(err);
        dispatch({
            type: GET_LIBRARY_FAIL
        })
    }
}

export const addToLibrary = async (bookid) => {
    try {
        const res = await axios.post('api/library', {
            book: {
                id: bookid
            }
        });
        if (res.statusCode >= 400) {
            return false;
        }
        else {
            loadLibrary();
            return true;
        }
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const removeFromLibrary = async (bookid) => {
    try {
        const res = await axios.delete('api/library', {
            data: {
                book: {
                    id: bookid
                }
            }
        });
        if (res.statusCode >= 400) {
            return false;
        }
        else {
            loadLibrary();
            return true;
        }
    }
    catch (err) {
        console.error(err);
        return false;
    }
}