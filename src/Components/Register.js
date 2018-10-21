import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../Redux/reducer.register';
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    let { username, email, password, confirm_password } = this.state;
    let { isRegisterPending, isRegisterSuccess, registerError } = this.props;
    return (
      <div className="container ri-register-box-container">
        <div className="row justify-content-md-center">
          <div className="col-lg-6 col-md-6 col align-self-center">

            <form name="loginForm" onSubmit={this.onSubmit}>
              <p className="h4 text-center mb-4">Register</p>

              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">Your username</label>
              <input type="text" id="defaultFormLoginEmailEx" className="form-control ri-register-input" onChange={e => this.setState({ username: e.target.value })} value={username} />

              <br />

              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">Your email</label>
              <input type="email" id="defaultFormLoginEmailEx" className="form-control ri-register-input" onChange={e => this.setState({ email: e.target.value })} value={email} />

              <br />

              <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">Your password</label>
              <input type="password" id="defaultFormLoginPasswordEx" className="form-control ri-register-input" onChange={e => this.setState({ password: e.target.value })} value={password} />

              <br />

              <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">Confirm password</label>
              <input type="password" id="defaultFormLoginPasswordEx" className="form-control ri-register-input" onChange={e => this.setState({ confirm_password: e.target.value })} value={confirm_password} />

              <div className="text-center mt-4">
                <button className="btn btn-dark" type="submit">Confirm</button>
              </div>

              <div className="message">
                {isRegisterPending && <div>Please wait...</div>}
                {isRegisterSuccess && <div>Success.</div>}
                {registerError && <div>{registerError.message}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>

    );
  }

  onSubmit(e) {
    e.preventDefault();
    let { username, email, password, confirm_password } = this.state;
    this.props.register(username, email, password, confirm_password);
    this.setState({
      username: '',
      email: '',
      password: '',
      confirm_password: ''
    });
  }
}

const mapStateToProps = (state) => {
  return {
    isRegisterPending: state.isRegisterPending,
    isRegisterSuccess: state.isRegisterSuccess,
    registerError: state.registerError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (username, email, password, confirm_password) => dispatch(register(username, email, password, confirm_password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
