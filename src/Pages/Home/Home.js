import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { GetMeAction, AddFriendAction, SearchUsersAction } from '../../redux/actions/global';
import UserList from '../../Components/UserList';
import './Home.css';
import { ResetLoginState } from '../../redux/actions/login';

class Home extends Component {
  search = '';

  users = [];

  constructor(props) {
    super(props);
    const { getInfo, resetLogin, jwt } = this.props;
    getInfo(jwt);
    resetLogin();
    this.jwt = jwt;
  }

  handleChangeSearch = e => {
    this.search = e.target.value;
    const { searchUsers } = this.props;
    searchUsers(this.jwt, this.search);
  };

  handleAddFriend = (friend, e) => {
    e.preventDefault();
    const { addFriend } = this.props;
    addFriend(this.jwt, friend.id);
  };

  render() {
    const { userChecked, allowed, users } = this.props;
    if (userChecked && !allowed) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container">
        <div className="row ri-search-bar">
          <div className="col-md-12">
            <div className="search-box">
              <form className="search-form">
                <input
                  className="form-control"
                  placeholder="looking for someone ?"
                  type="text"
                  onChange={this.handleChangeSearch}
                />
              </form>
            </div>
          </div>
        </div>

        <div className="row ri-friend-list">
          <div className="col-md-12">
            <UserList users={users} addFriend={this.handleAddFriend} />
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  getInfo: PropTypes.func.isRequired,
  addFriend: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  resetLogin: PropTypes.func.isRequired,
  jwt: PropTypes.string.isRequired,
  allowed: PropTypes.bool.isRequired,
  userChecked: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      friend: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired
};

const mapStateToProps = state => ({
  jwt: state.GlobalReducer.jwt,
  email: state.GlobalReducer.email,
  username: state.GlobalReducer.username,
  allowed: state.GlobalReducer.allowed,
  userChecked: state.GlobalReducer.userChecked,
  users: state.GlobalReducer.users
});

const mapDispatchToProps = dispatch => ({
  getInfo: jwt => dispatch(GetMeAction(jwt)),
  addFriend: (jwt, email) => dispatch(AddFriendAction(jwt, email)),
  searchUsers: (jwt, search) => dispatch(SearchUsersAction(jwt, search)),
  resetLogin: () => dispatch(ResetLoginState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
