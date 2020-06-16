import {
    LOAD_BOOKS_SUCCESS, 
    LOAD_BOOK_FAIL
} from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case LOAD_BOOKS_SUCCESS:
            return payload;
        default:
            return state;
    }
}