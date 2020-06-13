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
        if (res.data.success) {
            dispatch({
                type: GET_LIBRARY_SUCCESS,
                payload: res.data.books
            });
        }
        else {
            dispatch({
                type: GET_LIBRARY_FAIL
            })
        }
    }
    catch (err) {
        dispatch({
            type: GET_LIBRARY_FAIL
        })
    }
}

export const isInLibrary = async (bookid) => {
    try {
        const res = await axios.get('api/library', {
            params: {
                bookid: bookid
            }
        });
        if (res.data.success) {
            return res.data.books.length > 0;
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
}

export const addToLibrary = async (bookid) => {
    try {
        //console.log('add ', bookid);
        const res = await axios.post('api/library', {
            book: {
                id: bookid
            }
        });
        if (res.data.success) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const removeFromLibrary = async (bookid) => {
    try {
        //console.log('delete ', bookid);
        const res = await axios.delete('api/library?bookid=' + bookid);
        if (res.data.success) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.error(err);
        return false;
    }
}