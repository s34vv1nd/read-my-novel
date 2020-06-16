import axios from 'axios';
import {
    LOAD_REVIEWS_SUCCESS,
    LOAD_REVIEWS_FAIL
} from './types';

//Get reviews of current book

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