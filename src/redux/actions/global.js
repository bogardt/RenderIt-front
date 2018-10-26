import axios from 'axios';

const setUserInfos = (email, username, jwt, allowed) => ({
  type: 'SET_USER_INFOS',
  email,
  username,
  jwt,
  allowed
});

export const GetMeAction = jwt => dispatch => {
  console.log('GET ME ACTION')
  axios
    .get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(response => {
      dispatch(
        setUserInfos({
          email: response.data.email,
          username: response.data.username,
          jwt,
          allowed: true
        })
      );
    })
    .catch(error => {
      dispatch(
        setUserInfos({
          email: error.response.data.email,
          username: error.response.data.username,
          jwt,
          allowed: false
        })
      );
    });
};

export const GetMe = GetMeAction;
