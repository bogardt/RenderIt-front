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

function callLoginApi(email, password, callback) {
  setTimeout(() => {
    if (email === 'test@test.org' && password === 'pass') {
      return callback(null);
    }
    return callback(new Error('Invalid email and password'));
  }, 1000);
}

export function LoginAction(email, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    callLoginApi(email, password, error => {
      dispatch(setLoginPending(false));
      if (!error) {
        dispatch(setLoginSuccess(true));
      } else {
        dispatch(setLoginError(error));
      }
    });
  };
}

export const login = LoginAction;
