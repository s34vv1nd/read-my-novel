import {
    GET_BOOKS_SUCCESS, 
    GET_GENRES_SUCCESS
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
                books: payload
            };
        case GET_GENRES_SUCCESS:
            return {
                genres: payload
            }
        default:
            return state;
    }
}