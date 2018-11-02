import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
// import openSocket from 'socket.io-client';
import DisplayRooms from '../../Components/DisplayRooms';
import DisplayMessages from '../../Components/DisplayMessages';
import FriendsList from '../../Components/FriendsList';
import { GetMeAction, SearchFriendsAction, RemoveFriendAction } from '../../redux/actions/global';
import { ChangeSelectedRoom, SendMessage } from '../../redux/actions/rooms';
import './Messages.css';

const cookies = new Cookies();

// const socket = openSocket(window.location.origin);

class Messages extends Component {
  input = '';

  searchFriendsInput = '';

  constructor(props) {
    super(props);
    const { getInfo } = this.props;
    const jwt = cookies.get('jwt');
    getInfo(jwt);
    this.jwt = jwt;
  }

  handleChangeInput = e => {
    this.input = e.target.value;
  };

  handleSendInput = e => {
    e.preventDefault();
    const { selectedRoom, sendMessage } = this.props;
    sendMessage(selectedRoom, this.input);
  };

  handleChangeSearchFriends = e => {
    this.searchFriendsInput = e.target.value;
    const { searchFriends } = this.props;
    searchFriends(this.jwt, this.searchFriendsInput);
  };

  handleRemoveFriend = (friend, e) => {
    e.preventDefault();
    const { removeFriend } = this.props;
    removeFriend(this.jwt, friend);
  };

  render() {
    const { rooms, selectedRoom, userChecked, allowed, friends } = this.props;
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
                <div className="srch_bar">
                  <div className="stylish-input-group">
                    <input
                      type="text"
                      className="search-bar"
                      placeholder="Search"
                      onChange={this.handleChangeSearchFriends}
                    />
                    <span className="input-group-addon">
                      <button type="button">
                        <i className="fa fa-search" aria-hidden="true" />
                      </button>
                    </span>
                  </div>
                </div>
                <FriendsList friends={friends} deleteFriend={this.handleRemoveFriend} />
              </div>
              <DisplayRooms rooms={rooms} />
            </div>

            <div className="mesgs">
              <DisplayMessages
                messages={rooms[selectedRoom].messages}
                fromer={rooms[selectedRoom].from}
                toer={rooms[selectedRoom].to}
              />
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
  selectedRoom: PropTypes.string.isRequired,
  allowed: PropTypes.bool.isRequired,
  userChecked: PropTypes.bool.isRequired,
  friends: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  rooms: state.RoomReducer.rooms,
  selectedRoom: state.RoomReducer.selectedRoom,
  allowed: state.GlobalReducer.allowed,
  userChecked: state.GlobalReducer.userChecked,
  friends: state.GlobalReducer.friends
});

const mapDispatchToProps = dispatch => ({
  getInfo: jwt => dispatch(GetMeAction(jwt)),
  sendMessage: (selectedRoom, message) => dispatch(SendMessage(selectedRoom, message)),
  changeSelectedRoom: selectedRoom => dispatch(ChangeSelectedRoom(selectedRoom)),
  searchFriends: (jwt, searchFriends) => dispatch(SearchFriendsAction(jwt, searchFriends)),
  removeFriend: (jwt, friend) => dispatch(RemoveFriendAction(jwt, friend))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
