import axios from 'axios';

function setRegisterPending(isRegisterPending) {
  return {
    type: 'SET_REGISTER_PENDING',
    isRegisterPending
  };
}

function setRegisterMsg(registerMsg) {
  return {
    type: 'SET_REGISTER_MSG',
    registerMsg
  };
}

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
        dispatch(setRegisterMsg(response.data.message));
      })
      .catch(error => {
        dispatch(setRegisterMsg(error.response.data.message));
      });
  };
}

export const register = RegisterAction;
