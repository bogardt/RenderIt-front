const initialState = {
  isSocketConnectPending: false,
  isSocketConnected: false
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SOCKET_CONNECT_PENDING':
      return {
        ...state,
        isSocketConnectPending: action.isSocketConnectPending
      };

    case 'SET_SOCKET_CONNECTED':
      return {
        ...state,
        isSocketConnectPending: false,
        isSocketConnected: action.isSocketConnected
      };

    case 'SET_AUHTORIZATION_EVENT_RECEIVED':
      return {
        ...state,
        AuthorizationEventReceived: action.AuthorizationEventReceived
      };

    case 'SET_JOIN_ROOM_EVENT_RECEIVED':
      return {
        ...state,
        setJoinRoomEventReceived: action.setJoinRoomEventReceived
      };

    case 'SET_CREATE_ROOM_EVENT_RECEIVED':
      return {
        ...state
      };

    case 'SET_LEAVE_ROOM_EVENT_RECEIVED':
      return {
        ...state,
        setLeaveRoomEventReceived: action.setLeaveRoomEventReceived
      };

    case 'SET_MESSAGE_EVENT_RECEIVED':
      return {
        ...state,
        setMessageEventReceived: action.setMessageEventReceived
      };

    case 'SET_TYPING_EVENT_RECEIVED':
      return {
        ...state,
        setTypingEventReceived: action.setTypingEventReceived
      };

    case 'SET_STOP_TYPING_EVENT_RECEIVED':
      return {
        ...state
      };

    case 'SET_SUCCESS_EVENT_RECEIVED':
      return {
        ...state
      };

    case 'SET_ERROR_EVENT_RECEIVED':
      return {
        ...state
      };

    case 'SET_AUHTORIZATION_EVENT_SENT':
      return {
        ...state,
        AuthorizationEventSent: action.AuthorizationEventSent
      };

    case 'SET_MESSAGE_EVENT_SENT':
      return {
        ...state,
        setMessageEventSent: action.setMessageEventSent
      };

    case 'SET_JOIN_ROOM_EVENT_SENT':
      return {
        ...state,
        setJoinRoomEventSent: action.setJoinRoomEventSent
      };

    case 'SET_CREATE_ROOM_EVENT_SENT':
      return {
        ...state,
        setJoinRoomEventSent: action.setJoinRoomEventSent
      };

    case 'SET_LEAVE_ROOM_EVENT_SENT':
      return {
        ...state,
        setLeaveRoomEventSent: action.setJoinRoomEventSent
      };

    case 'SET_TYPING_EVENT_SENT':
      return {
        ...state,
        setTypingEventSent: action.setTypingEventSent
      };

    case 'SET_STOP_TYPING_EVENT_SENT':
      return {
        ...state
      };

    default:
      return state;
  }
};

export default ChatReducer;
