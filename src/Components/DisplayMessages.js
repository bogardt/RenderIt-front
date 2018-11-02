import React from 'react';
import PropTypes from 'prop-types';
import './DisplayMessages.css';

const InOrOutComing = (message, fromer) => {
  if (message.from === fromer) {
    return (
      <div className="incoming_msg">
        <div className="incoming_msg_img">
          <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
        </div>
        <div className="received_msg">
          <div className="received_withd_msg">
            <p>{message.message}</p>
            <span className="time_date">{message.date}</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{message.message}</p>
        <span className="time_date">{message.date}</span>
      </div>
    </div>
  );
};

const DisplayMessages = ({ messages, fromer }) => (
  <div className="msg_history">{messages.map(message => InOrOutComing(message, fromer))}</div>
);

DisplayMessages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })
  ).isRequired,
  fromer: PropTypes.string.isRequired
};

export default DisplayMessages;
