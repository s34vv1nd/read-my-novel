import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import creation from './creation';
import browse from './browse';
import book from './book';

export default combineReducers({
  alert,
  auth,
  creation,
  browse,
  book
});
