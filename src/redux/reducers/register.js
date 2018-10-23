export default function RegisterReducer(
  state = {
    isRegisterSuccess: false,
    isRegisterPending: false,
    registerMsg: null
  },
  action
) {
  switch (action.type) {
    case 'SET_REGISTER_PENDING':
      return Object.assign({}, state, {
        isRegisterPending: action.isRegisterPending
      });

    case 'SET_REGISTER_SUCCESS':
      return Object.assign({}, state, {
        isRegisterSuccess: action.isRegisterSuccess
      });

    case 'SET_REGISTER_MSG':
      return Object.assign({}, state, {
        registerMsg: action.registerMsg
      });

    default:
      return state;
  }
}
