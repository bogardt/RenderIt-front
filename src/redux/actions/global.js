import axios from 'axios';
import toaster from '../../Utils/Toaster';

const setUserInfos = (email, username, jwt, allowed) => ({
  type: 'SET_USER_INFOS',
  email,
  username,
  jwt,
  allowed
});

const setUserSearch = users => ({
  type: 'SET_USER_SEARCH',
  users
});

const setFriendsSearch = friends => ({
  type: 'SET_FRIENDS_SEARCH',
  friends
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

export const AddFriendAction = (jwt, email) => () => {
  axios
    .post(
      '/api/users/friends',
      { email },
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    )
    .then(response => {
      if (response.status === 201) {
        toaster.success(response.data.message);
      } else {
        toaster.error(response.data);
      }
    })
    .catch(error => {
      toaster.error(error.respoonse.data.message);
    });
};

export const RemoveFriendAction = (jwt, friend) => () => {
  axios
    .delete(`/api/users/friends/${friend}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(response => {
      if (response.status === 201) {
        toaster.success(response.data.message);
      } else {
        toaster.error(response.data);
      }
    })
    .catch(error => {
      toaster.error(error.respoonse.data.message);
    });
};

export const SearchUsersAction = (jwt, search) => dispatch => {
  axios
    .get(`/api/users/pattern/${search}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(response => {
      dispatch(setUserSearch(response.data.users));
    })
    .catch(error => {
      console.log(`ERROR on search users : ${JSON.stringify(error)}`);
    });
};

export const SearchFriendsAction = (jwt, search) => dispatch => {
  axios
    .get(`/api/users/friends/pattern/${search}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(response => {
      console.log(response);
      dispatch(setFriendsSearch(response.data.friends));
    })
    .catch(error => {
      console.log(`ERROR on search friends : ${JSON.stringify(error)}`);
    });
};
