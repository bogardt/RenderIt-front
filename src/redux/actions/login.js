import axios from 'axios';

function setLoginPending(isLoginPending) {
  return {
    type: 'SET_LOGIN_PENDING',
    isLoginPending
  };
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: 'SET_LOGIN_SUCCESS',
    isLoginSuccess
  };
}

function setLoginError(loginError) {
  return {
    type: 'SET_LOGIN_ERROR',
    loginError
  };
}

export function LoginAction(email, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
    axios
      .post('/api/auth/login', {
        email,
        password
      })
      .then(response => {
        console.log(response);
        dispatch(setLoginPending(false));
        dispatch(setLoginSuccess(true));
      })
      .catch(error => {
        console.log(error);
        dispatch(setLoginPending(false));
        dispatch(setLoginError('Unauthorized'));
      });
  };
}

export const login = LoginAction;
