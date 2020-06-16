import {
    LOAD_LIBRARY_SUCCESS,
} from '../actions/types';

const initialState = {
    books: []
}

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case LOAD_LIBRARY_SUCCESS:
            return {
                ...state,
                books: payload
            }
        default:
            return state;
    }
}