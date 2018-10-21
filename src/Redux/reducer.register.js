import axios from 'axios';

const SET_REGISTER_PENDING = 'SET_REGISTER_PENDING';
const SET_REGISTER_SUCCESS = 'SET_REGISTER_SUCCESS';
const SET_REGISTER_ERROR = 'SET_REGISTER_ERROR';

export function register(username, email, password, confirm_password) {
  return dispatch => {
    dispatch(setRegisterPending(true));
    dispatch(setRegisterSuccess(false));
    dispatch(setRegisterError(null));

    _apiRegister(username, email, password, confirm_password, error => {
      dispatch(setRegisterPending(false));
      if (!error) {
        dispatch(setRegisterSuccess(true));
      } else {
        dispatch(setRegisterError(error));
      }
    });
  }
}

function setRegisterPending(isRegisterPending) {
  return {
    type: SET_REGISTER_PENDING,
    isRegisterPending
  };
}

function setRegisterSuccess(isRegisterSuccess) {
  return {
    type: SET_REGISTER_SUCCESS,
    isRegisterSuccess
  };
}

function setRegisterError(registerError) {
  return {
    type: SET_REGISTER_ERROR,
    registerError
  }
}

function _apiRegister(username, email, password, confirm_password, callback) {
  axios.post('http://localhost:4000/api/users', {
    username: username,
    email: email,
    password: password,
    role: 'user'
  })
  .then(function (response) {
    return callback(response);
  })
  .catch(function (error) {
    return callback(error);
  });
}

export default function reducer(state = {
  isRegisterSuccess: false,
  isRegisterPending: false,
  registerError: null
}, action) {
  switch (action.type) {
    case SET_REGISTER_PENDING:
      return Object.assign({}, state, {
        isRegisterPending: action.isRegisterPending
      });

    case SET_REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isRegisterSuccess: action.isRegisterSuccess
      });

    case SET_REGISTER_ERROR:
      return Object.assign({}, state, {
        registerError: action.registerError
      });

    default:
      return state;
  }
}