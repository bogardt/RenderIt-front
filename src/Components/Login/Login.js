import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/login';

class Login extends Component {
  username = '';

  password = '';

  _handleChangeUsername = e => {
    this.username = e.target;
  };

  _handleChangePassword = e => {
    this.password = e.target;
  };

  _handleSubmit = e => {
    e.preventDefault();
    const { handleSubmit } = this.props;
    handleSubmit(this.username, this.password);
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
                <form className="form-signin" name="Login" onSubmit={this._handleSubmit}>
                  <div className="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email address"
                      required
                      autoFocus
                      onChange={this._handleChangeUsername}
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
                      onChange={this._handleChangePassword}
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
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    to="/register"
                  >
                    Sign up
                  </button>
                  <hr className="my-4" />

                  <div className="message">
                    {isLoginPending && <div>Please wait...</div>}
                    {isLoginSuccess && <div>Success.</div>}
                    {loginError && <div>{loginError.message}</div>}
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

const mapStateToProps = state => ({
  isLoginPending: state.LoginReducer.isLoginPending,
  isLoginSuccess: state.LoginReducer.isLoginSuccess,
  loginError: state.LoginReducer.loginError
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: (email, password) => dispatch(login(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
