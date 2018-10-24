import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { toastsReducer as toasts } from 'react-toastify-redux';
import LoginReducer from './reducers/login';
import RegisterReducer from './reducers/register';

const reducers = combineReducers({
  LoginReducer,
  RegisterReducer,
  toasts
});

const store = createStore(reducers, {}, applyMiddleware(thunk, logger));
export default store;
