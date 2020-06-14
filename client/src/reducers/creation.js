import {
    CREATE_SUCCESS,
    CREATE_FAIL,
    GET_CREATED_BOOKS_SUCCESS,
    GET_CREATED_BOOKS_FAIL,
    CREATE_CHAPTER_SUCCESS,
    LOGOUT
} from '../actions/types';

const initialState = {
    books: [],
    chapter: null
}

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_CREATED_BOOKS_SUCCESS:
            return {
                books: payload,
            };
        case CREATE_CHAPTER_SUCCESS:
            return {
                ...state,
                chapter: payload
            };
        case LOGOUT:
            return {
                books: [],
            }
        default:
            return state;
    }
}