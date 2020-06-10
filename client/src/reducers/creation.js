import {
    CREATE_SUCCESS,
    CREATE_FAIL,
    GET_CREATED_BOOKS_SUCCESS,
    GET_CREATED_BOOKS_FAIL
} from '../actions/types';

const initialState = {
    books: []
}

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_CREATED_BOOKS_SUCCESS:
            return {
                books: payload
            };
        // case CREATE_SUCCESS:
        //     return {
        //         ...state,
        //         books: state.books.concat(payload.book)
        //     };
        default:
            return state;
    }
}