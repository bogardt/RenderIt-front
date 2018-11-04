import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import LoginReducer from './reducers/login';
import RegisterReducer from './reducers/register';
import GlobalReducer from './reducers/global';
import ChatReducer from './reducers/chat';

const reducers = combineReducers({
  GlobalReducer,
  LoginReducer,
  RegisterReducer,
  ChatReducer
});

const store = createStore(reducers, {}, applyMiddleware(thunk, logger));
export default store;
