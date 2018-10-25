const initialState = {
  isRegisterPending: false,
  payload: null
};

const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_REGISTER_PENDING':
      return {
        ...state,
        isRegisterPending: true
      };

    case 'SET_REGISTER_MSG':
      return {
        ...state,
        isRegisterPending: false,
        payload: action.payload
      };

    default:
      return state;
  }
};

export default RegisterReducer;
