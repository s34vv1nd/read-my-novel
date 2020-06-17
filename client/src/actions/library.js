import axios from 'axios';
import {
    LOAD_LIBRARY_SUCCESS,
    LOAD_LIBRARY_FAIL,
} from './types';

export const loadLibrary = () => async dispatch => {
    try {
        const res = await axios.get('api/library');
        if (res.data.success) {
            dispatch({
                type: LOAD_LIBRARY_SUCCESS,
                payload: res.data.books
            });
        }
        else {
            dispatch({
                type: LOAD_LIBRARY_FAIL
            })
        }
    }
    catch (err) {
        dispatch({
            type: LOAD_LIBRARY_FAIL
        })
    }
}

export const updateBookmark = async ({ bookid, chapnum }) => {
    try {
        const { data } = await axios.put('/api/library/', {
            book: {
                id: bookid,
                chapter: chapnum
            }
        });
        return data.success ? true : false;
    }
    catch (err) {
        console.error(err);
        throw err;
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