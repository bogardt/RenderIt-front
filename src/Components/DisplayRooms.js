import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ChangeSelectedRoom } from '../redux/actions/rooms';
import './DisplayRooms.css';

class DisplayRooms extends Component {
  handleChangeSelectedRoom = index => {
    const { changeSelectedRoom } = this.props;
    changeSelectedRoom(index);
  };

  render() {
    const { rooms, selectedRoom } = this.props;
    return (
      <div className="inbox_chat">
        {rooms.map((room, index) => (
          <div
            className={`chat_list ${selectedRoom === index ? 'active_chat' : ''}`}
            onClick={e => this.handleChangeSelectedRoom(index, e)}
          >
            <div className="chat_people">
              <div className="chat_img">
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
              </div>
              <div className="chat_ib">
                <h5>
                  {room.from}
                  <span className="chat_date">
                    {room.messages.length > 0 && room.messages[0].date}
                  </span>
                </h5>
                <p>{room.messages.length > 0 && room.messages[0].message}</p>
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
      messages: PropTypes.arrayOf(
        PropTypes.shape({
          message: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired
        })
      ).isRequired,
      date: PropTypes.string.isRequired,
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  changeSelectedRoom: PropTypes.func.isRequired,
  selectedRoom: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  rooms: state.RoomReducer.rooms,
  selectedRoom: state.RoomReducer.selectedRoom
});

const mapDispatchToProps = dispatch => ({
  changeSelectedRoom: selectedRoom => dispatch(ChangeSelectedRoom(selectedRoom))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayRooms);
