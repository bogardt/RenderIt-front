const initialState = {
  isLoginPending: false,
  isLogged: false,
  payload: null
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_PENDING':
      return {
        ...state,
        isLoginPending: action.isLoginPending
      };

    case 'SET_IS_LOGGED':
      return {
        ...state,
        isLoginPending: false,
        isLogged: action.isLogged
      };

    case 'SET_LOGIN_PAYLOAD':
      return {
        ...state,
        isLoginPending: false,
        payload: action.payload
      };

    default:
      return state;
  }
};

export default LoginReducer;
