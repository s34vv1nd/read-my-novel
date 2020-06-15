import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import creation from './creation';
import browse from './browse';
import book from './book';
import rankings from './rankings';
import genres from './genres';
import books from './books';

export default combineReducers({
  alert,
  auth,
  creation,
  browse,
  book,
  rankings,
  genres,
  books
});
