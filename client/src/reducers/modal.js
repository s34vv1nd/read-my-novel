import {
    SHOW_MODAL,
    CHOOSE_OPTION,
    HIDE_MODAL
} from '../actions/types';

const initialState = {
    show: false,
    heading: '',
    body: '',
    options: [],
    option: null
}

export default function(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case SHOW_MODAL:
            return {
                ...state,
                show: true,
                heading: payload.heading,
                body: payload.body,
                options: payload.options,
                option: null
            }
        case CHOOSE_OPTION:
            return {
                ...state,
                option: payload
            }
        case HIDE_MODAL:
            return {
                ...state,
                show: false
            }
        default:
            return state;
    }
}