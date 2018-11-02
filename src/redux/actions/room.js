const setSelectedRoom = selectedRoom => ({
  type: 'SET_SELECTED_ROOM',
  selectedRoom
});

export const ChangeSelectedRoom = selectedRoom => dispatch => {
  dispatch(setSelectedRoom(selectedRoom));
};

export default ChangeSelectedRoom;
