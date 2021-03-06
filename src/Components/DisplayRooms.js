import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ChangeSelectedRoom } from '../redux/actions/chat';
import './DisplayRooms.css';

class DisplayRooms extends Component {
  handleChangeSelectedRoom = index => {
    const { jwt, changeSelectedRoom, rooms } = this.props;
    changeSelectedRoom(jwt, rooms[index].id, index);
  };

  render() {
    const { rooms, selectedRoom } = this.props;
    return (
      <div className="inbox_chat">
        {rooms.map((room, index) => (
          <div
            className={`chat_list ${selectedRoom === index ? 'active_chat' : ''}`}
            onClick={e => this.handleChangeSelectedRoom(index, e)}
            onKeyUp={e => this.handleChangeSelectedRoom(index, e)}
            onKeyDown={e => this.handleChangeSelectedRoom(index, e)}
            key={room.id}
            tabIndex={index}
            role="button"
          >
            <div className="chat_people">
              <div className="chat_img">
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
              </div>
              <div className="chat_ib">
                <h5>
                  {room.name}
                  <span className="chat_date">
                    {room.history.length > 0 && room.history[0].length > 0 && room.history[0].date}
                  </span>
                </h5>
                <p>{room.history.length > 0 && room.history[0].message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

DisplayRooms.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      history: PropTypes.arrayOf(
        PropTypes.shape({
          message: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired
        })
      ).isRequired
    }).isRequired
  ).isRequired,
  changeSelectedRoom: PropTypes.func.isRequired,
  selectedRoom: PropTypes.number.isRequired,
  jwt: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  jwt: state.GlobalReducer.jwt,
  rooms: state.ChatReducer.rooms,
  selectedRoom: state.ChatReducer.selectedRoom
});

const mapDispatchToProps = dispatch => ({
  changeSelectedRoom: (jwt, roomId, selectedRoom) =>
    dispatch(ChangeSelectedRoom(jwt, roomId, selectedRoom))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayRooms);
