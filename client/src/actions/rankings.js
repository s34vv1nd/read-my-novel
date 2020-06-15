import axios from 'axios';
import {
    GET_RANKINGS_SUCCESS, 
    GET_RANKINGS_FAIL
} from './types';

//Get list of books
export const loadRankings = () => async dispatch => {
    try {
        const res = await axios.get('api/books', {
            params: {
                sortBy: 'rating'
            }
        });
        console.log(res.data.books);
        dispatch({
            type: GET_RANKINGS_SUCCESS,
            payload: res.data.books
        });
    } catch(err) {
        dispatch({
            type: GET_RANKINGS_FAIL
        });
    }
}