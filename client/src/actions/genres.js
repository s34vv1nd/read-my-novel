import axios from 'axios';
import {
    LOAD_GENRES_SUCCESS,
    LOAD_GENRES_FAIL
} from './types'

export const loadGenres = () => async dispatch => {
    try {
        const res = await axios.get('api/genres');
        dispatch({
            type: LOAD_GENRES_SUCCESS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: LOAD_GENRES_FAIL
        })
    }
}