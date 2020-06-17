import axios from 'axios';
import {
    LOAD_BOOK_SUCCESS,
    LOAD_BOOK_FAIL,
    CHECK_LIBRARY_SUCCESS,
    CHECK_LIBRARY_FAIL,
    ADD_TO_LIBRARY_SUCCESS,
    ADD_TO_LIBRARY_FAIL,
    REMOVE_FROM_LIBRARY_SUCCESS,
    REMOVE_FROM_LIBRARY_FAIL,
    UPDATE_LIBRARY_SUCCESS,
    UPDATE_LIBRARY_FAIL,
    LOAD_REVIEWS_SUCCESS,
    LOAD_REVIEWS_FAIL,
    POST_REVIEWS_SUCCESS,
    POST_REVIEWS_FAIL
} from './types';

export const updateBookmark = ({ bookid, chapnum }) => async dispatch => {
    try {
        const { data } = await axios.put('/api/library/', {
            book: {
                id: bookid,
                chapter: chapnum
            }
        });
        dispatch({
            type: data.success ? UPDATE_LIBRARY_SUCCESS : UPDATE_LIBRARY_FAIL,
            payload: chapnum
        });
    }
    catch (err) {
        console.error(err);
        dispatch({ type: UPDATE_LIBRARY_FAIL });
    }
}

export const isInLibrary = (bookid) => async dispatch => {
    try {
        const res = await axios.get('api/library', {
            params: {
                bookid: bookid
            }
        });
        dispatch({
            type: CHECK_LIBRARY_SUCCESS,
            payload: (res.data.books != 0)
        })
    }
    catch (err) {
        dispatch({
            type: CHECK_LIBRARY_FAIL
        })
    }
}

export const addToLibrary = (bookid) => async dispatch => {
    try {
        const res = await axios.post('api/library', {
            book: {
                id: bookid
            }
        });
        dispatch({
            type: (res.data.success) ? ADD_TO_LIBRARY_SUCCESS : ADD_TO_LIBRARY_FAIL
        })
    }
    catch (err) {
        dispatch({
            type: ADD_TO_LIBRARY_FAIL
        })
    }
}

export const removeFromLibrary = (bookid) => async dispatch => {
    try {
        const res = await axios.delete('api/library?bookid=' + bookid);
        dispatch({
            type: (res.data.success) ? REMOVE_FROM_LIBRARY_SUCCESS : REMOVE_FROM_LIBRARY_FAIL
        })
    }
    catch (err) {
        dispatch({
            type: REMOVE_FROM_LIBRARY_FAIL
        })
    }
}

export const loadReviews = (bookid) => async dispatch => {
    try {
        const res = await axios.get('api/books/' + bookid + '/reviews');
        dispatch({
            type: LOAD_REVIEWS_SUCCESS,
            payload: res.data.reviews
        });
    } catch(err) {
        console.error(err);
        dispatch({
            type: LOAD_REVIEWS_FAIL
        });
    }
}

export const postReviews = (bookid, content) => async dispatch => {
    try {
        const res = await axios.post('api/books/' + bookid + '/reviews', {
            content
        });
        dispatch(loadReviews(bookid));
        dispatch({
            type: POST_REVIEWS_SUCCESS,
        });
    } catch(err) {
        console.error(err);
        dispatch({
            type: POST_REVIEWS_FAIL
        });
    }
}

export const loadBook = (bookid) => async dispatch => {
    try {
        let res = await axios.get('api/books/' + bookid);
        const book = res.data.book;
        await dispatch(loadReviews(bookid));
        await dispatch(isInLibrary(bookid));
        dispatch({
            type: LOAD_BOOK_SUCCESS,
            payload: { book }
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: LOAD_BOOK_FAIL
        });
    }
}