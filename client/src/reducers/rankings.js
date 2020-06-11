import {
    GET_RANKINGS_SUCCESS, 
    GET_RANKINGS_FAIL
} from '../actions/types';

const initialState = {
    books: []
}

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_RANKINGS_SUCCESS:
            return {
                books: payload
            };
        default:
            return state;
    }
}