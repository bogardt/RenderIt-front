const initialState = {
  selectedRoom: 0,
  rooms: [
    {
      date: '30/10/2018',
      from: 'test@tes.fr',
      to: 'test@test.fr',
      messages: [
        {
          message: 'hihi',
          date: '30/10/2018',
          from: 'test@tes.fr'
        },
        {
          message: 'hoho',
          date: '30/10/2018',
          from: 'test@test.fr'
        }
      ]
    },
    {
      date: '30/10/2018',
      from: 'test@tes.fr',
      to: 'test@test.fr',
      messages: [
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

    default:
      return state;
  }
};

export default RoomReducer;
