import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { LoginAction, ResetLoginAction } from '../../redux/actions/login';
import toaster from '../../Utils/Toaster';

class Login extends Component {
  static defaultProps = {
    isLoginSuccess: false
  };

  email = '';

  password = '';

  constructor(props) {
    super(props);
    ResetLoginAction();
  }

  handleChangeEmail = e => {
    this.email = e.target.value;
  };

  handleChangePassword = e => {
    this.password = e.target.value;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { signIn } = this.props;
    signIn(this.email, this.password);
  };

  render() {
    const { isLoginSuccess, isLogged } = this.props;
    if (isLoginSuccess && !isLogged) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <form className="form-signin" name="Login" onSubmit={this.handleSubmit}>
                  <div className="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email address"
                      required
                      onChange={this.handleChangeEmail}
                    />
                    <label htmlFor="inputEmail">Email address</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      required
                      onChange={this.handleChangePassword}
                    />
                    <label htmlFor="inputPassword">Password</label>
                  </div>

                  <div className="custom-control custom-checkbox mb-3">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">
                      Remember password
                    </label>
                  </div>

                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                    Sign in
                  </button>
                  <Link
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    to="/register"
                    type="button"
                  >
                    Sign up
                  </Link>
                  <hr className="my-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
  isLoginSuccess: PropTypes.bool,
  isLogged: PropTypes.bool
};

const mapStateToProps = state => {
  let success = false;
  if (!state.LoginReducer.isLoginPending && state.LoginReducer.payload !== null) {
    if (state.LoginReducer.payload.status === 200) {
      success = true;
      toaster.success(state.LoginReducer.payload.message);
    } else {
      toaster.error('Not found');
    }
  }
  return {
    isLoginPending: state.LoginReducer.isLoginPending,
    isLoginSuccess: success,
    isLogged: state.LoginReducer.isLogged,
    payload: state.LoginReducer.payload
  };
};

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(LoginAction(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
