import {
    LOAD_GENRES_SUCCESS,
    LOAD_GENRES_FAIL
} from '../actions/types'

const InitialState = [];

export default function(state = InitialState, action) {
    switch (action.type) {
        case LOAD_GENRES_SUCCESS:
            return state = action.payload;
        default:
            return state
    }
}