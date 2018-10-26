import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { GetMeAction } from '../../redux/actions/global';
import { ResetLogin } from '../../redux/actions/login';

class Home extends Component {
  constructor(props) {
    super(props);
    const { jwt } = this.props;
    GetMeAction(jwt);
  }

  render() {
    const { userChecked, allowed, jwt } = this.props;
    console.log(`userchecked: ${userChecked}`);
    console.log(`allowed: ${allowed}`);
    if (!userChecked && !allowed) {
      return <div />;
      // return <Redirect to="/login" />;
    }
    return (
      <div className="container">
        <div className="row">
          <h1 className="text-center" style="color:white;">WELCOME MY FRIEND</h1>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  jwt: PropTypes.string.isRequired,
  allowed: PropTypes.bool.isRequired,
  userChecked: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    jwt:
      state.LoginReducer.payload !== undefined &&
      state.LoginReducer.payload !== null &&
      state.LoginReducer.payload.bearer !== undefined
        ? state.LoginReducer.payload.bearer
        : '',
    email: state.GlobalReducer.email,
    username: state.GlobalReducer.username,
    allowed: state.GlobalReducer.allowed,
    userChecked: state.GlobalReducer.userChecked
  };
};

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
