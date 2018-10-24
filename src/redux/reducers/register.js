const initialState = {
  isRegisterSuccess: false,
  isRegisterPending: false,
  registerMsg: null
};

export default function RegisterReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_REGISTER_PENDING':
      return {
        ...state,
        isRegisterPending: true
      };

    case 'SET_REGISTER_SUCCESS':
      return {
        ...state,
        isRegisterSuccess: true
      };

    case 'SET_REGISTER_MSG':
      return {
        ...state,
        isRegisterPending: false,
        isRegisterSuccess: true,
        registerMsg: action.registerMsg
      };

    default:
      return state;
  }
}
