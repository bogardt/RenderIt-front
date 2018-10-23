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

function setLoginMsg(loginMsg) {
  return {
    type: 'SET_LOGIN_MSG',
    loginMsg
  };
}

export function LoginAction(email, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginMsg(null));
    axios
      .post('/api/auth/login', {
        email,
        password
      })
      .then(response => {
        console.log(response);
        dispatch(setLoginPending(false));
        dispatch(setLoginSuccess(true));

        dispatch(setLoginMsg(response.data.bearer));
      })
      .catch(error => {
        console.log(error);
        dispatch(setLoginPending(false));
        dispatch(setLoginMsg('Not found'));
      });
  };
}

export const login = LoginAction;
