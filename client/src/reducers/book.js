import {
    LOAD_BOOK_SUCCESS, 
    LOAD_BOOK_FAIL,
    CHECK_LIBRARY_SUCCESS,
    ADD_TO_LIBRARY_SUCCESS,
    REMOVE_FROM_LIBRARY_SUCCESS,
    UPDATE_LIBRARY_SUCCESS,
    LOAD_REVIEWS_SUCCESS
} from '../actions/types';

const initialState = {
    book: null,
    inLibrary: null,
    reviews: null,
    bookmark: null
}

export default function(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case LOAD_BOOK_SUCCESS:
            return {
                ...state,
                book: payload.book,
            }
        case CHECK_LIBRARY_SUCCESS:
            return {
                ...state,
                inLibrary: payload
            }
        case ADD_TO_LIBRARY_SUCCESS:
            return {
                ...state,
                inLibrary: true
            }
        case REMOVE_FROM_LIBRARY_SUCCESS:
            return {
                ...state,
                inLibrary: false
            }
        case UPDATE_LIBRARY_SUCCESS:
            return {
                ...state,
                bookmark: payload
            }
        case LOAD_REVIEWS_SUCCESS:
            return {
                ...state,
                reviews: payload
            }
        default:
            return state;
    }
}