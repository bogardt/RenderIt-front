const initialState = {
  isLoginSuccess: false,
  isLoginPending: false,
  payload: null
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOGIN_PENDING':
      return {
        ...state,
        isLoginPending: true
      };

    case 'SET_LOGIN_SUCCESS':
      return {
        ...state,
        isLoginPending: false,
        isLoginSuccess: action.isLoginSuccess
      };

    case 'SET_LOGIN_PAYLOAD':
      return {
        ...state,
        isLoginPending: false,
        isLoginSuccess: action.isLoginSuccess,
        payload: action.payload
      };

    default:
      return state;
  }
}
