import axios from 'axios';

const setRegisterPending = isRegisterPending => ({
  type: 'SET_REGISTER_PENDING',
  isRegisterPending
});

const setRegisterPayload = payload => ({
  type: 'SET_REGISTER_MSG',
  payload
});

export function RegisterAction(email, username, password) {
  return dispatch => {
    dispatch(setRegisterPending(true));
    axios
      .post('/api/users', {
        email,
        username,
        password
      })
      .then(response => {
        dispatch(
          setRegisterPayload({
            status: response.status,
            message: response.data.message
          })
        );
      })
      .catch(error => {
        dispatch(
          setRegisterPayload({
            status: error.response.data.status,
            message: error.response.data.message
          })
        );
      });
  };
}

export const register = RegisterAction;
