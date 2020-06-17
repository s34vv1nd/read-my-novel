import {
    LOAD_REVIEWS_SUCCESS,
    LOAD_REVIEWS_FAIL,
    POST_REVIEWS_SUCCESS,
    POST_REVIEWS_FAIL
} from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case LOAD_REVIEWS_SUCCESS:
            return payload;
        default:
            return state;
    }
}