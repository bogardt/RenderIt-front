import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
// import openSocket from 'socket.io-client';
import DisplayRooms from '../../Components/DisplayRooms';
import DisplayMessages from '../../Components/DisplayMessages';
import FriendsList from '../../Components/FriendsList';
import { ChangeSelectedRoom, SendMessage, GetRooms } from '../../redux/actions/rooms';
import {
  GetMeAction,
  SearchFriendsAction,
  RemoveFriendAction,
  ResetFriendsAction
} from '../../redux/actions/global';
import {
  StopTypingAction,
  TypingAction,
  CreateRoomAction,
  AddFriendInRoomAction
} from '../../redux/actions/chat';
import './Messages.css';

const cookies = new Cookies();

// const socket = openSocket(window.location.origin);

class Messages extends Component {
  input = '';

  searchFriendsInput = '';

  roomName = '';

  constructor(props) {
    super(props);
    const { getInfo, getRooms } = this.props;
    const jwt = cookies.get('jwt');
    getInfo(jwt);
    getRooms(jwt);
    console.log(`cookies jwt: ${jwt}`);
    this.jwt = jwt;
  }

  handleChangeInput = e => {
    this.input = e.target.value;
    const { selectedRoom } = this.props;
    if (this.input === null) {
      StopTypingAction(selectedRoom);
    } else {
      TypingAction(selectedRoom);
    }
  };

  handleSendInput = e => {
    e.preventDefault();
    const { selectedRoom, sendMessage } = this.props;
    sendMessage(selectedRoom, this.input);
  };

  handleChangeSearchFriends = e => {
    this.searchFriendsInput = e.target.value;
    const { searchFriends } = this.props;
    if (this.searchFriendsInput.length > 0) {
      searchFriends(this.jwt, this.searchFriendsInput);
    }
  };

  handleRemoveFriend = (friend, e) => {
    e.preventDefault();
    const { removeFriend } = this.props;
    removeFriend(this.jwt, friend);
  };

  handleChangeNameRoom = e => {
    this.roomName = e.target.value;
  };

  handleAddRoom = () => {
    const { addRoom } = this.props;
    addRoom(this.jwt, this.roomName);
  };

  handleClickOnRemoveSearchFriends = () => {
    const { resetFriends } = this.props;
    this.searchFriendsInput = '';
    resetFriends();
  };

  handleAddFriendToConv = (friend, e) => {
    const { addFriendInRoom, rooms, selectedRoom } = this.props;
    addFriendInRoom(friend.id, rooms[selectedRoom].id);
  };

  render() {
    const { rooms, selectedRoom, userChecked, allowed, friends, email } = this.props;
    console.log(friends);
    if (userChecked && !allowed) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container ri-container-messages">
        <div className="messaging">
          <div className="inbox_msg">
            <div className="inbox_people">
              <div className="headind_srch">
                <div className="recent_heading">
                  <h4>Rooms</h4>
                </div>
              </div>
              <DisplayRooms rooms={rooms} />
              <div className="ri-container-create-room-name">
                <input
                  type="text"
                  className="search-bar ri-add-room-input"
                  placeholder="New room"
                  onChange={this.handleChangeNameRoom}
                />
                <span className="input-group-addon">
                  <button type="button" onClick={this.handleAddRoom}>
                    <i className="fa fa-plus ri-add-room-btn" aria-hidden="true" />
                  </button>
                </span>
              </div>
            </div>

            <div className="mesgs">
              <div className="search-box ri-search-boox-room-container">
                <input
                  className="form-control ri-add-room-input"
                  placeholder="want to add friend to this conversation ?"
                  type="text"
                  onChange={this.handleChangeSearchFriends}
                />
                <button className="btn btn-link search-btn">
                  <i
                    className="fa fa-close"
                    aria-hidden="true"
                    onClick={this.handleClickOnRemoveSearchFriends}
                  />
                </button>
              </div>
              <FriendsList
                friends={friends}
                friendFunc={this.handleRemoveFriend}
                iconClassName="fa-plus"
              />
              {rooms.length > 0 && (
                <DisplayMessages history={rooms[selectedRoom].history} email={email} />
              )}
              <div className="type_msg">
                <div className="input_msg_write">
                  <input
                    type="text"
                    className="write_msg"
                    placeholder="Type a message"
                    onChange={this.handleChangeInput}
                  />
                  <button className="msg_send_btn" type="button" onClick={this.handleSendInput}>
                    <i className="fa fa-paper-plane-o" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Messages.propTypes = {
  getInfo: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  searchFriends: PropTypes.func.isRequired,
  removeFriend: PropTypes.func.isRequired,
  getRooms: PropTypes.func.isRequired,
  addRoom: PropTypes.func.isRequired,
  resetFriends: PropTypes.func.isRequired,
  addFriendInRoom: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      history: PropTypes.arrayOf(
        PropTypes.shape({
          message: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          from: PropTypes.string.isRequired
        })
      ).isRequired
    }).isRequired
  ).isRequired,
  selectedRoom: PropTypes.number.isRequired,
  allowed: PropTypes.bool.isRequired,
  userChecked: PropTypes.bool.isRequired,
  friends: PropTypes.arrayOf(PropTypes.string).isRequired,
  email: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  rooms: state.RoomReducer.rooms,
  selectedRoom: state.RoomReducer.selectedRoom,
  allowed: state.GlobalReducer.allowed,
  userChecked: state.GlobalReducer.userChecked,
  friends: state.GlobalReducer.friends,
  email: state.GlobalReducer.email
});

const mapDispatchToProps = dispatch => ({
  getInfo: jwt => dispatch(GetMeAction(jwt)),
  getRooms: jwt => dispatch(GetRooms(jwt)),
  sendMessage: (selectedRoom, message) => dispatch(SendMessage(selectedRoom, message)),
  changeSelectedRoom: selectedRoom => dispatch(ChangeSelectedRoom(selectedRoom)),
  searchFriends: (jwt, searchFriends) => dispatch(SearchFriendsAction(jwt, searchFriends)),
  removeFriend: (jwt, friend) => dispatch(RemoveFriendAction(jwt, friend)),
  addRoom: (jwt, name) => dispatch(CreateRoomAction(name)),
  resetFriends: () => dispatch(ResetFriendsAction()),
  TypingAction: selectedRoom => dispatch(TypingAction(selectedRoom)),
  StopTypingAction: selectedRoom => dispatch(StopTypingAction(selectedRoom)),
  addFriendInRoom: (friendId, roomId) => dispatch(AddFriendInRoomAction(friendId, roomId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
