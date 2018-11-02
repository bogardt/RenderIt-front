import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import Cookies from 'js-cookie';
import { createCookieMiddleware } from 'redux-cookie';
import LoginReducer from './reducers/login';
import RegisterReducer from './reducers/register';
import GlobalReducer from './reducers/global';
import RoomReducer from './reducers/rooms';

const reducers = combineReducers({
  GlobalReducer,
  LoginReducer,
  RegisterReducer,
  RoomReducer
});

const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk, logger, createCookieMiddleware(Cookies))
);
export default store;
