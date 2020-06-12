import {
    GET_BOOK_SUCCESS, 
    GET_CHAPTER_SUCCESS,
} from '../actions/types';

const initialState = {
    book: {
        author: {},
        genres: [{}]
    },
    chapters: []
}

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_BOOK_SUCCESS:
            return {
                book: payload.book,
                chapters: payload.chapters
            };
        case GET_CHAPTER_SUCCESS:
            return {
                book: payload.book,
                chapters: payload.chapters
            }
        default:
            return state;
    }
}