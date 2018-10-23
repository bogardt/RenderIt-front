import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/login';

class Login extends Component {
  email = '';

  password = '';

  static defaultProps = {
    loginError: null
  };

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
    const { isLoginPending, isLoginSuccess, loginError } = this.props;
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

                  <div className="message">
                    {isLoginPending && <div>Please wait...</div>}
                    {isLoginSuccess && <div>Success.</div>}
                    {loginError && <div>{loginError}</div>}
                  </div>
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
  isLoginPending: PropTypes.bool.isRequired,
  isLoginSuccess: PropTypes.bool.isRequired,
  loginError: PropTypes.string
};

const mapStateToProps = state => ({
  isLoginPending: state.LoginReducer.isLoginPending,
  isLoginSuccess: state.LoginReducer.isLoginSuccess,
  loginError: state.LoginReducer.loginError
});

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(login(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
