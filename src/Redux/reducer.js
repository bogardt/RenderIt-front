import { combineReducers } from 'redux';

import { login } from './reducer.login';
import { register } from './reducer.register';

const rootReducer = combineReducers({
  login: login,
  register: register
});

export default rootReducer;