import axios from 'axios';
import toaster from '../../Utils/Toaster';

const setLoginPending = isLoginPending => ({
  type: 'SET_LOGGING_PENDING',
  isLoginPending
});

const setLoginPayload = payload => ({
  type: 'SET_LOGIN_PAYLOAD',
  payload
});

const setIsLogged = isLogged => ({
  type: 'SET_LOGGED',
  isLogged
});

export const SetLoggedState = isLogged => dispatch => {
  dispatch(setIsLogged(isLogged));
};

export const ResetLoginState = () => dispatch => {
  dispatch(setLoginPending(false));
  dispatch(
    setLoginPayload({
      status: 0,
      message: ''
    })
  );
};

export const LoginAction = (email, password) => dispatch => {
  dispatch(setLoginPending(true));
  axios
    .post('/api/auth/login', {
      email,
      password
    })
    .then(response => {
      dispatch(
        setLoginPayload({
          status: response.status,
          message: response.data.bearer
        })
      );
      if (response.status === 200) {
        toaster.success(response.data.bearer);
      } else {
        toaster.error(response.data);
      }
    })
    .catch(error => {
      dispatch(
        setLoginPayload({
          status: error.response.status,
          message: error.response.data.message
        })
      );
      toaster.success(error.response.data.message);
    });
};
