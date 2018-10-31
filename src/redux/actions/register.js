import axios from 'axios';
import toaster from '../../Utils/Toaster';

const setRegisterPending = isRegisterPending => ({
  type: 'SET_REGISTER_PENDING',
  isRegisterPending
});

const setRegisterPayload = payload => ({
  type: 'SET_REGISTER_PAYLOAD',
  payload
});

export const RegisterAction = (email, username, password) => dispatch => {
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
      if (response.status === 201) {
        toaster.success(response.data.message);
      } else {
        toaster.error(response.data.message);
      }
    })
    .catch(error => {
      dispatch(
        setRegisterPayload({
          status: error.response.data.status,
          message: error.response.data.message
        })
      );
      toaster.error(error.respoonse.data.message);
    });
};

export const register = RegisterAction;
