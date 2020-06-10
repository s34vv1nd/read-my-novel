import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import creation from './creation';

export default combineReducers({
  alert,
  auth,
  creation
});
