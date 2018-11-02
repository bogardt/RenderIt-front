import React from 'react';
import PropTypes from 'prop-types';
import './UserList.css';

const UserList = ({ users, addFriend }) => (
  <ul className="list-group">
    {users.map(user => (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        {user.email}
        {!user.friend && (
          <i
            className="fa fa-plus ri-add-friend-icon"
            aria-hidden="true"
            onClick={event => addFriend(user.email, event)}
          />
        )}
      </li>
    ))}
  </ul>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      friend: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  addFriend: PropTypes.func.isRequired
};

export default UserList;
