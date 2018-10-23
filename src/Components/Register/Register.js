import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../redux/actions/register';
import toaster from '../../Utils/Toaster';

class Register extends Component {
  email = '';

  username = '';

  password = '';

  passwordConfirm = '';

  handleChangeEmail = e => {
    this.email = e.target.value;
  };

  handleChangeUsername = e => {
    this.username = e.target.value;
  };

  handleChangePassword = e => {
    this.password = e.target.value;
  };

  handleChangeConfirmPassword = e => {
    this.passwordConfirm = e.target.value;
  };

  handleSubmit = e => {
    e.preventDefault();

    const { signUp } = this.props;
    if (this.password !== this.passwordConfirm) {
      toaster.error("Password doesn't match !");
    } else {
      signUp(this.email, this.username, this.password);
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign Up</h5>
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
                      type="text"
                      id="inputUsername"
                      className="form-control"
                      placeholder="Username"
                      required
                      onChange={this.handleChangeUsername}
                    />
                    <label htmlFor="inputUsername">Username</label>
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

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputConfirmPassword"
                      className="form-control"
                      placeholder="Confirm password"
                      required
                      onChange={this.handleChangeConfirmPassword}
                    />
                    <label htmlFor="inputConfirmPassword">Confirm password</label>
                  </div>

                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                    Sign up
                  </button>

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

Register.propTypes = {
  signUp: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  if (state.RegisterReducer.registerMsg !== null) {
    if (state.RegisterReducer.isRegisterSuccess) {
      toaster.success(state.RegisterReducer.registerMsg);
    } else {
      toaster.error(state.RegisterReducer.registerMsg);
    }
    state.RegisterReducer.registerMsg = null;
  }
  return {
    isRegisterPending: state.RegisterReducer.isRegisterPending,
    isRegisterSuccess: state.RegisterReducer.isRegisterSuccess,
    registerMsg: state.RegisterReducer.registerMsg
  };
};

const mapDispatchToProps = dispatch => ({
  signUp: (email, username, password) => dispatch(register(email, username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
