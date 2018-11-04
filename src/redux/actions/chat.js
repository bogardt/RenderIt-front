import io from 'socket.io-client';
import axios from 'axios';
import toaster from '../../Utils/Toaster';
import SocketSingleton from '../../Utils/SocketSingleton';

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

const setAddFriendToRoomEventReceived = () => ({
  type: 'SET_ADD_FRIEND_TO_ROOM_EVENT_RECEIVED'
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

const setAddFriendToRoomEventSent = () => ({
  type: 'SET_ADD_FRIEND_TO_ROOM_EVENT_SENT'
});

const setCreateRoomEventSent = () => ({
  type: 'SET_CREATE_ROOM_EVENT_SENT'
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
const setSelectedRoom = selectedRoom => ({
  type: 'SET_SELECTED_ROOM',
  selectedRoom
});

const setUserRooms = rooms => ({
  type: 'SET_USER_ROOMS',
  rooms
});

const setCurrentHistory = history => ({
  type: 'SET_USER_HISTORY',
  history
});

export const ChangeSelectedRoom = (bearer, roomId, index) => dispatch => {
  dispatch(setSelectedRoom(index));
  axios
    .get(`/api/room/${roomId}`, {
      headers: {
        Authorization: `Bearer ${bearer}`
      }
    })
    .then(response => {
      dispatch(setCurrentHistory(response.data.history));
    })
    .catch(error => {
      console.log(`error: ${JSON.stringify(error)}`);
    });
};

export const GetRooms = jwt => dispatch => {
  axios
    .get('/api/users/rooms', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(response => {
      dispatch(setUserRooms(response.data.rooms));
    })
    .catch(error => {
      console.log(`error: ${JSON.stringify(error)}`);
    });
};

export const GetRoom = (jwt, roomId) => dispatch => {
  axios
    .get(`/api/room/${roomId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(response => {
      dispatch(setCurrentHistory(response.data.history));
    })
    .catch(error => {
      console.log(`error: ${JSON.stringify(error)}`);
    });
}

export const TypingAction = roomId => dispatch => {
  SocketSingleton.socket.emit('typing', roomId);
  dispatch(setTypingEventSent);
};

export const StopTypingAction = roomId => dispatch => {
  SocketSingleton.socket.emit('stop-typing', roomId);
  dispatch(setStopTypingEventSent);
};

export const SendMessageAction = (message, roomId) => dispatch => {
  console.log(message);
  console.log(roomId);
  SocketSingleton.socket.emit('message', message, roomId);
  dispatch(setMessageEventSent());
};

export const JoinRoomAction = roomId => dispatch => {
  SocketSingleton.socket.emit('join-room', roomId);
  dispatch(setJoinRoomEventSent());
};

export const AddFriendInRoomAction = (userId, roomId) => dispatch => {
  console.log(`userId: ${userId}`);
  console.log(`roomId: ${roomId}`);
  SocketSingleton.socket.emit('add-friend', userId, roomId);
  dispatch(setAddFriendToRoomEventSent());
};

export const CreateRoomAction = roomName => dispatch => {
  console.log(`roomName: ${roomName}`);
  SocketSingleton.socket.emit('create-room', roomName);
  dispatch(setCreateRoomEventSent());
};

export const LeaveRoomAction = roomId => dispatch => {
  SocketSingleton.socket.emit('leave-room', roomId);
  dispatch(setLeaveRoomEventSent());
};

export const ServerConnectAction = (email, bearer) => dispatch => {
  dispatch(setSocketConnectPending(true));
  const socket = io('http://localhost:4000');
  if (socket) {
    SocketSingleton.socket = socket;
    dispatch(setIsSocketConnected(true));
    socket.on('authorization', message => {
      dispatch(setAuthorizationEventReceived(message));
      socket.emit('authorization', email);
      dispatch(setAuthorizationEventSent());
    });

    socket.on('success', message => {
      dispatch(setSuccessEventReceived());
      // toaster.success(message);
    });

    socket.on('fail', message => {
      dispatch(setErrorEventReceived());
      // toaster.error(message);
    });

    socket.on('join-room', room => {
      dispatch(setJoinRoomEventReceived());
      // objet room avec id history user etc..
    });

    socket.on('add-friend', message => {
      dispatch(setAddFriendToRoomEventReceived());
      toaster.success(`Added friend to room ${message.name}`);
    });

    socket.on('create-room', room => {
      dispatch(setCreateRoomEventReceived());
      toaster.success(`Created room ${room.name}`);
      axios
        .get('/api/users/rooms', {
          headers: {
            Authorization: `Bearer ${bearer}`
          }
        })
        .then(response => {
          dispatch(setUserRooms(response.data.rooms));
        })
        .catch(error => {
          console.log(`error: ${JSON.stringify(error)}`);
        });
    });

    socket.on('leave-room', message => {
      dispatch(setLeaveRoomEventReceived());
      if (message.includes('Success')) {
        dispatch(setSuccessEventReceived());
        toaster.success(message);
      } else {
        dispatch(setErrorEventReceived());
        toaster.error(message);
      }
    });

    socket.on('room-response', history => {
      dispatch(setMessageEventReceived());
      axios
        .get(`/api/room/${history.toString()}`, {
          headers: {
            Authorization: `Bearer ${bearer}`
          }
        })
        .then(response => {
          dispatch(setCurrentHistory(response.data.history));
        })
        .catch(error => {
          console.log(`error: ${JSON.stringify(error)}`);
        });
    });

    socket.on('typing', room => {
      dispatch(setTypingEventReceived());
      // objet room avec id history user etc..
    });

    socket.on('stop-typing', room => {
      dispatch(setStopTypingEventReceived());
      // objet room avec id history user etc..
    });
  } else dispatch(setIsSocketConnected(false));
};
