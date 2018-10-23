export default function LoginReducer(
  state = {
    isLoginSuccess: false,
    isLoginPending: false,
    loginMsg: null
  },
  action
) {
  switch (action.type) {
    case 'SET_LOGIN_PENDING':
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });

    case 'SET_LOGIN_SUCCESS':
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case 'SET_LOGIN_MSG':
      return Object.assign({}, state, {
        loginMsg: action.loginMsg
      });

    default:
      return state;
  }
}
