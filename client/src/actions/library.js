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