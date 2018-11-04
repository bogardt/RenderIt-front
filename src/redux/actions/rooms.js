import { SendMessageAction } from './chat';

const setSelectedRoom = selectedRoom => ({
  type: 'SET_SELECTED_ROOM',
  selectedRoom
});

export const ChangeSelectedRoom = selectedRoom => dispatch => {
  dispatch(setSelectedRoom(selectedRoom));
};

export const SendMessage = (selectedRoom, message) => dispatch => {
  console.log(`room [${selectedRoom}] send message: ${message}`);
  SendMessageAction(message, selectedRoom);
};
