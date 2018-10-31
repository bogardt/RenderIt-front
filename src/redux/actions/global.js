import axios from 'axios';

const setUserInfos = (email, username, jwt, allowed) => ({
  type: 'SET_USER_INFOS',
  email,
  username,
  jwt,
  allowed
});

export const GetMeAction = jwt => dispatch => {
  axios
    .get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(response => {
      dispatch(setUserInfos(response.data.email, response.data.username, jwt, true));
    })
    .catch(error => {
      dispatch(setUserInfos(error.response.data.email, error.response.data.username, jwt, false));
    });
};

export const GetMe = GetMeAction;
