import React from 'react';
import PropTypes from 'prop-types';
import './DisplayMessages.css';

const InOrOutComing = (message, email, index) => {
  if (message.from === email) {
    return (
      <div className="outgoing_msg" key={index}>
        <div className="sent_msg">
          <p>{message.message}</p>
          <span className="time_date">{message.date}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="incoming_msg" key={index}>
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
};

const DisplayMessages = ({ history, email }) => (
  <div className="msg_history">
    {history.map((message, index) => InOrOutComing(message, email, index))}
  </div>
);

DisplayMessages.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })
  ).isRequired,
  email: PropTypes.string.isRequired
};

export default DisplayMessages;
