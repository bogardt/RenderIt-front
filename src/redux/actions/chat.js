import io from 'socket.io-client';
import toaster from '../../Utils/Toaster';

const setSocketConnectPending = isSocketConnectPending => ({
  type: 'SET_SOCKET_CONNECT_PENDING',
  isSocketConnectPending
});

const setIsSocketConnected = isSocketConnected => ({
  type: 'SET_SOCKET_CONNECTED',
  isSocketConnected
});

const setAuthorizationEventReceived = () => ({
  type: 'SET_AUTHORIZATION_EVENT_RECEIVED'
});

const setJoinRoomEventReceived = () => ({
  type: 'SET_JOIN_ROOM_EVENT_RECEIVED'
});

const setCreateRoomEventReceived = () => ({
  type: 'SET_CREATE_ROOM_EVENT_RECEIVED'
});

const setLeaveRoomEventReceived = () => ({
  type: 'SET_LEAVE_ROOM_EVENT_RECEIVED'
});

const setMessageEventReceived = () => ({
  type: 'SET_MESSAGE_EVENT_RECEIVED'
});

const setTypingEventReceived = () => ({
  type: 'SET_TYPING_EVENT_RECEIVED'
});

const setStopTypingEventReceived = () => ({
  type: 'SET_STOP_TYPING_EVENT_RECEIVED'
});

const setSuccessEventReceived = () => ({
  type: 'SET_SUCCESS_EVENT_RECEIVED'
});
const setErrorEventReceived = () => ({
  type: 'SET_ERROR_EVENT_RECEIVED'
});

const setAuthorizationEventSent = () => ({
  type: 'SET_AUTHORIZATION_EVENT_SENT'
});

const setJoinRoomEventSent = () => ({
  type: 'SET_JOIN_ROOM_EVENT_SENT'
});

const setCreateRoomEventSent = () => ({
  type: 'SET_LEAVE_ROOM_EVENT_SENT'
});

const setLeaveRoomEventSent = () => ({
  type: 'SET_LEAVE_ROOM_EVENT_SENT'
});

const setMessageEventSent = () => ({
  type: 'SET_MESSAGE_EVENT_SENT'
});

const setTypingEventSent = () => ({
  type: 'SET_TYPING_EVENT_SENT'
});

const setStopTypingEventSent = () => ({
  type: 'SET_STOP_TYPING_EVENT_SENT'
});

export const TypingAction = roomId => dispatch => {
  this.context.socket.emit('typing', roomId);
  dispatch(setTypingEventSent);
};

export const StopTypingAction = roomId => dispatch => {
  this.context.socket.emit('stop-typing', roomId);
  dispatch(setStopTypingEventSent);
};

export const SendMessageAction = (message, roomId) => dispatch => {
  this.context.socket.emit('message', message, roomId);
  dispatch(setMessageEventSent());
};

export const JoinRoomAction = roomId => dispatch => {
  this.context.socket.emit('join-room', roomId);
  dispatch(setJoinRoomEventSent());
};

export const CreateRoomAction = roomName => dispatch => {
  this.context.socket.emit('create-room', roomName);
  dispatch(setCreateRoomEventSent());
};

export const LeaveRoomAction = roomId => dispatch => {
  this.context.socket.emit('leave-room', roomId);
  dispatch(setLeaveRoomEventSent());
};

export const SocketEventManagerAction = (email, bearer) => dispatch => {
  this.context.socket.on('authorization', message => {
    dispatch(setAuthorizationEventReceived(message));
    this.context.socket.emit('authorization', email, bearer);
    dispatch(setAuthorizationEventSent());
  });

  this.context.socket.on('success', message => {
    dispatch(setSuccessEventReceived());
    toaster.success(message);
  });

  this.context.socket.on('error', message => {
    dispatch(setErrorEventReceived());
    toaster.error(message);
  });

  this.context.socket.on('join-room', room => {
    dispatch(setJoinRoomEventReceived());
    // objet room avec id history user etc..
  });

  this.context.socket.on('create-room', room => {
    dispatch(setCreateRoomEventReceived());
    // objet room avec id history user etc..
  });

  this.context.socket.on('leave-room', message => {
    dispatch(setLeaveRoomEventReceived());
    if (message.includes('Success')) {
      dispatch(setSuccessEventReceived());
      toaster.success(message);
    } else {
      dispatch(setErrorEventReceived());
      toaster.error(message);
    }
  });

  this.context.socket.on('message', history => {
    dispatch(setMessageEventReceived());
    // tableau de message, history complet de la room
  });

  this.context.socket.on('typing', room => {
    dispatch(setTypingEventReceived());
    // objet room avec id history user etc..
  });

  this.context.socket.on('stop-typing', room => {
    dispatch(setStopTypingEventReceived());
    // objet room avec id history user etc..
  });
};

export const ServerConnectAction = () => dispatch => {
  dispatch(setSocketConnectPending(true));
  this.context.socket = io('http://localhost:4000');
  dispatch(setIsSocketConnected(true));
  SocketEventManagerAction();
};
