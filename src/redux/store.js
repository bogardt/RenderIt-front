import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import Cookies from 'js-cookie';
import { createCookieMiddleware } from 'redux-cookie';
import LoginReducer from './reducers/login';
import RegisterReducer from './reducers/register';

const reducers = combineReducers({
  LoginReducer,
  RegisterReducer
});

const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk, logger, createCookieMiddleware(Cookies))
);
export default store;
