import {
    CREATE_SUCCESS,
    CREATE_FAIL,
    GET_CREATED_BOOKS_SUCCESS,
    GET_CREATED_BOOKS_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {
    books: [],
    loadingbooks: true
}

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_CREATED_BOOKS_SUCCESS:
            return {
                books: payload,
                loadingbooks: false
            };
        // case CREATE_SUCCESS:
        //     return {
        //         ...state,
        //         books: state.books.concat(payload.book)
        //     };
        case LOGOUT:
            return {
                books: [],
                loadingbooks: true
            }
        default:
            return state;
    }
}