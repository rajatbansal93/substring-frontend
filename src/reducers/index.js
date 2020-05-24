import { combineReducers } from 'redux';
import { users } from './user.reducer'
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  users
});

export default rootReducer;
