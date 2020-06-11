import {
    GET_BOOKS_SUCCESSFUL, 
    GET_BOOKS_FAIL
} from '../actions/types';

const initialState = {
    books: []
}

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_BOOKS_SUCCESSFUL:
            return {
                books: payload
            };
        default:
            return state;
    }
}