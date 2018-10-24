import axios from 'axios';

function setLoginPending(isLoginPending) {
  return {
    type: 'SET_LOGGING_PENDING',
    isLoginPending
  };
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: 'SET_LOGIN_SUCCESS',
    isLoginSuccess
  };
}

function setLoginMsg(payload) {
  return {
    type: 'SET_LOGIN_PAYLOAD',
    payload
  };
}

export function LoginAction(email, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    axios
      .post('/api/auth/login', {
        email,
        password
      })
      .then(response => {
        dispatch(setLoginSuccess(true));
        dispatch(setLoginMsg({ status: response.status, message: response.data.bearer }));
      })
      .catch(error => {
        dispatch(
          setLoginMsg({ status: error.response.status, message: error.response.data.message })
        );
      });
  };
}

export const login = LoginAction;
