const initialState = {
  email: '',
  username: '',
  jwt: '',
  allowed: false,
  userChecked: false,
  users: [],
  friends: []
};

const GlobalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_INFOS':
      return {
        ...state,
        email: action.email,
        username: action.username,
        jwt: action.jwt,
        allowed: action.allowed,
        userChecked: true
      };

    case 'SET_USER_SEARCH':
      return {
        ...state,
        users: action.users
      };

    case 'SET_FRIENDS_SEARCH':
      return {
        ...state,
        friends: action.friends
      };

    case 'SET_JWT':
      return {
        ...state,
        jwt: action.jwt
      };

    default:
      return state;
  }
};

export default GlobalReducer;
