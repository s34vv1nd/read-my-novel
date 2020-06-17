import {
    LOAD_BOOK_SUCCESS, 
    LOAD_BOOK_FAIL
} from '../actions/types';

const initialState = {
    book: null,
    isInLibrary: null,
    chapters: null,
    reviews: null
}

export default function(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case LOAD_BOOK_SUCCESS:
            return {
                ...state,
                book: payload.book,
            }
        default:
            return state;
    }
}