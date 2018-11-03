import React from 'react';
import PropTypes from 'prop-types';
import './FriendsList.css';

const FriendsList = ({ friends, deleteFriend }) => (
  <ul className="list-group">
    {friends.map(friend => (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        {friend}
        <i
          className="fa fa-trash ri-icon"
          aria-hidden="true"
          onClick={event => deleteFriend(friend, event)}
        />
      </li>
    ))}
  </ul>
);

FriendsList.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteFriend: PropTypes.func.isRequired
};

export default FriendsList;
