import React from 'react';
import PropTypes from 'prop-types';
import './FriendsList.css';

const FriendsList = ({ friends, friendFunc, iconClassName }) => (
  <ul className="list-group">
    {friends.map(friend => (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        {friend.email}
        <i
          className={`fa ri-icon ${iconClassName}`}
          aria-hidden="true"
          onClick={event => friendFunc(friend, event)}
        />
      </li>
    ))}
  </ul>
);

FriendsList.propTypes = {
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      friends: PropTypes.arrayOf(
        PropTypes.shape({
          email: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired
        })
      ).isRequired
    }).isRequired
  ).isRequired,
  friendFunc: PropTypes.func.isRequired,
  iconClassName: PropTypes.string.isRequired
};

export default FriendsList;
