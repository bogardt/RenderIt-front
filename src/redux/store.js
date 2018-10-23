import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import LoginReducer from './reducers/login';

const reducers = combineReducers({
  LoginReducer
});

const store = createStore(reducers, {}, applyMiddleware(thunk, logger));
export default store;
