import React from 'react';
import PropTypes from 'prop-types';
import './DisplayRooms.css';

const DisplayRooms = ({ rooms }) => (
  <div className="inbox_chat">
    {rooms.map(room => (
      <div className="chat_list active_chat">
        <div className="chat_people">
          <div className="chat_img">
            <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
          </div>
          <div className="chat_ib">
            <h5>
              {room.from}
              <span className="chat_date">{room.date}</span>
            </h5>
            <p>{room.messages[0].message}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

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
  ).isRequired
};

export default DisplayRooms;
