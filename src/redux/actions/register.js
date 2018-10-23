import axios from 'axios';

function setRegisterPending(isRegisterPending) {
  return {
    type: 'SET_REGISTER_PENDING',
    isRegisterPending
  };
}

function setRegisterSuccess(isRegisterSuccess) {
  return {
    type: 'SET_REGISTER_SUCCESS',
    isRegisterSuccess
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
    dispatch(setRegisterSuccess(false));
    dispatch(setRegisterMsg(null));
    axios
      .post('/api/users', {
        email,
        username,
        password
      })
      .then(response => {
        dispatch(setRegisterPending(false));
        dispatch(setRegisterSuccess(true));
        dispatch(setRegisterMsg(response.data.message));
      })
      .catch(error => {
        dispatch(setRegisterPending(false));
        dispatch(setRegisterMsg(error.response.data.message));
      });
  };
}

export const register = RegisterAction;
