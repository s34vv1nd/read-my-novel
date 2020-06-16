import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import rankings from './rankings';
import genres from './genres';
import books from './books';
import library from './library';

export default combineReducers({
  alert,
  auth,
  rankings,
  genres,
  books,
  library
});
