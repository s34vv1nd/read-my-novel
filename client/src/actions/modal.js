import {
    SHOW_MODAL,
    CHOOSE_OPTION,
    HIDE_MODAL
} from './types';

export const showModal = ({heading = '', body, options}) => dispatch => {
    try {
        dispatch({
            type: SHOW_MODAL,
            payload: {heading, body, options}
        })
    }
    catch (err) {
        console.error(err);
    }
}

export const chooseOption = (option) => dispatch => {
    try {
        dispatch({
            type: CHOOSE_OPTION,
            payload: option
        })
    }
    catch (err) {
        console.error(err);
    }
}

export const hideModal = () => dispatch => {
    try {
        dispatch({
            type: HIDE_MODAL,
        })
    }
    catch (err) {
        console.error(err);
    }
}