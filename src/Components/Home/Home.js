import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { GetMeAction } from '../../redux/actions/global';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    const { jwt, getInfo } = this.props;
    // getInfo(jwt);
  }

  render() {
    const { userChecked, allowed } = this.props;
    if (userChecked && !allowed) {
      // return <Redirect to="/login" />;
    }
    return (
      <div className="container ri-search-bar">
        <div className="row">
          <div className="col-md-6">
            <div className="search-box">
              <form className="search-form">
                <input className="form-control" placeholder="looking for someone ?" type="text" />
                <button className="btn btn-link search-btn">
                  <i className="fa fa-search" aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  getInfo: PropTypes.func.isRequired,
  jwt: PropTypes.string.isRequired,
  allowed: PropTypes.bool.isRequired,
  userChecked: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  jwt: state.LoginReducer.payload.message,
  email: state.GlobalReducer.email,
  username: state.GlobalReducer.username,
  allowed: state.GlobalReducer.allowed,
  userChecked: state.GlobalReducer.userChecked
});

const mapDispatchToProps = dispatch => ({
  getInfo: jwt => dispatch(GetMeAction(jwt))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
