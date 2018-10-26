const initialState = {
  email: '',
  username: '',
  jwt: '',
  allowed: false,
  userChecked: false
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

    default:
      return state;
  }
};

export default GlobalReducer;
