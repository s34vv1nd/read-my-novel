import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import rankings from './rankings';
import genres from './genres';
import books from './books';
import book from './book';
import library from './library';
import reviews from './reviews';
import modal from './modal';


export default combineReducers({
  alert,
  auth,
  rankings,
  genres,
  books,
  book,
  library,
  reviews,
  modal
});
