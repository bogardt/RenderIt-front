import axios from 'axios';

const setLoginPending = isLoginPending => ({
  type: 'SET_LOGGING_PENDING',
  isLoginPending
});

const setLoginPayload = payload => ({
  type: 'SET_LOGIN_PAYLOAD',
  payload
});

export const ResetAction = () => dispatch => {
  dispatch(setLoginPending(false));
  dispatch(setLoginPayload(null));
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
    })
    .catch(error => {
      dispatch(
        setLoginPayload({
          status: error.response.status,
          message: error.response.data.message
        })
      );
    });
};
