import axios from 'axios';
import { SendMessageAction } from './chat';

const setSelectedRoom = selectedRoom => ({
  type: 'SET_SELECTED_ROOM',
  selectedRoom
});

const setUserRooms = rooms => ({
  type: 'SET_USER_ROOMS',
  rooms
});

export const ChangeSelectedRoom = selectedRoom => dispatch => {
  dispatch(setSelectedRoom(selectedRoom));
};

export const SendMessage = (selectedRoom, message) => dispatch => {
  console.log(`room [${selectedRoom}] send message: ${message}`);
  SendMessageAction(message, selectedRoom);
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
