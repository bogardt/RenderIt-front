import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import openSocket from 'socket.io-client';
import DisplayRooms from '../../Components/DisplayRooms';
import DisplayMessages from '../../Components/DisplayMessages';
import { GetMeAction } from '../../redux/actions/global';
import { ChangeSelectedRoom } from '../../redux/actions/room';
import './Messages.css';

const cookies = new Cookies();

const socket = openSocket(window.location.origin);

class Messages extends Component {
  constructor(props) {
    super(props);
    const { getInfo } = this.props;
    const jwt = cookies.get('jwt');
    getInfo(jwt);
    this.jwt = jwt;
  }

  render() {
    const { rooms, selectedRoom } = this.props;
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
                    <input type="text" className="search-bar" placeholder="Search" />
                    <span className="input-group-addon">
                      <button type="button">
                        <i className="fa fa-search" aria-hidden="true" />
                      </button>
                    </span>
                  </div>
                </div>
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
                  <input type="text" className="write_msg" placeholder="Type a message" />
                  <button className="msg_send_btn" type="button">
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
  selectedRoom: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  rooms: state.RoomReducer.rooms,
  selectedRoom: state.RoomReducer.selectedRoom
});

const mapDispatchToProps = dispatch => ({
  getInfo: jwt => dispatch(GetMeAction(jwt)),
  changeSelectedRoom: selectedRoom => dispatch(ChangeSelectedRoom(selectedRoom))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
