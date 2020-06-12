import {
    GET_BOOKS_SUCCESS, 
    GET_GENRES_SUCCESS,
    GET_LIBRARY_SUCCESS,
    GET_LIBRARY_FAIL,
    ADD_BOOK_SUCCESS,
    ADD_BOOK_FAIL,
    REMOVE_FROM_LIBRARY_SUCCESS,
    REMOVE_FROM_LIBRARY_FAIL
} from '../actions/types';

const initialState = {
    books: [],
    genres: []
}

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_BOOKS_SUCCESS:
            return {
                ...state,
                books: payload,
            };
        case GET_GENRES_SUCCESS:
            return {
                ...state,
                genres: payload
            }
        case GET_LIBRARY_SUCCESS:
            return {
                ...state,
                books: payload
            }
        case GET_LIBRARY_FAIL:
            return {
                ...state,
                books: null
            }
        default:
            return state;
    }
}