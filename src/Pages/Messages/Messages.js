import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import DisplayRooms from '../../Components/DisplayRooms';
import DisplayMessages from '../../Components/DisplayMessages';
import './Messages.css';

const socket = openSocket(window.location.origin);

class Messages extends Component {
  selectedRoom = 0;

  rooms = [
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
  ];

  constructor(props) {
    super(props);
    const { jwt, getInfo } = this.props;
    // getInfo(jwt);
    this.jwt = jwt;
  }

  render() {
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
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <DisplayRooms rooms={this.rooms} />
            </div>

            <div className="mesgs">
              <DisplayMessages
                messages={this.rooms[this.selectedRoom].messages}
                fromer={this.rooms[this.selectedRoom].from}
                toer={this.rooms[this.selectedRoom].to}
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

export default Messages;
