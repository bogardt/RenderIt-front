import axios from 'axios';
import { setCookie } from 'redux-cookie';

function setLoginPending(isLoginPending) {
  return {
    type: 'SET_LOGGING_PENDING',
    isLoginPending
  };
}

function setLoginPayload(payload) {
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
        dispatch(setLoginPayload({ status: response.status, message: response.data.bearer }));
        // setCookie('jwt', response.data.bearer);
      })
      .catch(error => {
        dispatch(
          setLoginPayload({ status: error.response.status, message: error.response.data.message })
        );
        // setCookie('jwt', null);
      });
  };
}

export const login = LoginAction;
