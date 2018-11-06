import axios from 'axios';
import toaster from '../../Utils/Toaster';

const setUserInfos = (email, username, jwt, allowed) => ({
  type: 'SET_USER_INFOS',
  email,
  username,
  jwt,
  allowed
});

const setJwt = jwt => ({
  type: 'SET_JWT',
  jwt
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

export const SetJwtAction = jwt => dispatch => {
  dispatch(setJwt(jwt));
};

export const AddFriendAction = (jwt, friendId) => () => {
  axios
    .post(
      '/api/users/friends',
      { id: friendId },
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
      console.log(error);
      toaster.error(error.response.message);
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

export const ResetFriendsAction = () => dispatch => {
  dispatch(setFriendsSearch([]));
};

export const AddRoomAction = (jwt, name) => () => {
  axios
    .post(
      '/api/room',
      { name },
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
      // actualise room json
    })
    .catch(error => {
      toaster.error(error.respoonse.data.message);
    });
};
