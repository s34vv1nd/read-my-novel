import {
    LOAD_BOOK_SUCCESS, 
    LOAD_BOOK_FAIL
} from '../actions/types';

const initialState = null;

export default function(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case LOAD_BOOK_SUCCESS:
            return payload;
        default:
            return state;
    }
}