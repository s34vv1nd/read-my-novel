import axios from 'axios';
import {
    LOAD_BOOK_SUCCESS, 
    LOAD_BOOK_FAIL
} from './types';
import {isInLibrary} from '../actions/library';

export const loadBook = (bookid) => async dispatch => {
    try {
        console.log("loadbook");
        let res = await axios.get('api/books/' + bookid);
        const book = res.data.book;
        //const isInLibrary = await isInLibrary(book._id);
        dispatch({
            type: LOAD_BOOK_SUCCESS,
            payload: {book}
        });
    } catch(err) {
        console.error(err);
        dispatch({
            type: LOAD_BOOK_FAIL
        });
    }
}