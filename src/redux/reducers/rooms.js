const initialState = {
  selectedRoom: 0,
  rooms: [
    {
      history: [
        {
          message: 'hihi',
          date: '30/10/2018',
          from: 'test@test.org'
        },
        {
          message: 'hoho',
          date: '30/10/2018',
          from: 'test@test.fr'
        }
      ]
    },
    {
      history: [
        {
          message: 'hihi',
          date: '30/10/2018',
          from: 'test@te.fr'
        }
      ]
    }
  ]
};

const RoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_ROOM':
      return {
        ...state,
        selectedRoom: action.selectedRoom
      };

    case 'SET_USER_ROOMS':
      return {
        ...state,
        rooms: action.rooms
      };

    default:
      return state;
  }
};

export default RoomReducer;
