import axios from 'axios';
import {
    GET_BOOK_SUCCESS, 
    GET_BOOK_FAIL,
    GET_CHAPTER_SUCCESS,
    GET_CHAPTER_FAIL
} from './types';

//Get list of books

export const loadBook = (bookID) => async dispatch => {
    try {
        const res = await axios.get('https::localhost:4000/api/book/' + bookID)
        console.log(res.data);
        dispatch({
            type: GET_BOOK_SUCCESS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: GET_BOOK_FAIL
        });
    }
}

export const loadChapter = (bookID, chapID) => async dispatch => {
    try {
        const res = await axios.get('https::localhost:4000/api/book/' + bookID + '/' + chapID);
        dispatch({
            type: GET_CHAPTER_SUCCESS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: GET_CHAPTER_FAIL
        })
    }
}
 