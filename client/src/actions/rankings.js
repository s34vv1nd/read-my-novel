import axios from 'axios';
import {
    GET_RANKINGS_SUCCESS, 
    GET_RANKINGS_FAIL
} from './types';

//Get list of books
export const loadRankings = () => async dispatch => {
    try {
        const res = await axios.get('api/browse', {
            params: {
                sortBy: 'rating'
            }
        });
        console.log(res.data);
        dispatch({
            type: GET_RANKINGS_SUCCESS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: GET_RANKINGS_FAIL
        });
    }
}