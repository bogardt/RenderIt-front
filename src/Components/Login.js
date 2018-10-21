import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../Redux/reducer.login';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    let { email, password } = this.state;
    let { isLoginPending, isLoginSuccess, loginError } = this.props;
    return (
      <div className="container ri-login-box-container">
        <div className="row justify-content-md-center">
          <div className="col-lg-6 col-md-6 col align-self-center">

            <form name="loginForm" onSubmit={this.onSubmit}>
              <p className="h4 text-center mb-4">Sign in</p>
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">Your email</label>
              <input type="email" id="defaultFormLoginEmailEx" className="form-control ri-login-input" onChange={e => this.setState({ email: e.target.value })} value={email} />
              <br />
              <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">Your password</label>
              <input type="password" id="defaultFormLoginPasswordEx" className="form-control ri-login-input" onChange={e => this.setState({ password: e.target.value })} value={password} />
              <div className="text-center mt-4">
                <button className="btn btn-dark" type="submit">Login</button>
              </div>
              <div className="message">
                {isLoginPending && <div>Please wait...</div>}
                {isLoginSuccess && <div>Success.</div>}
                {loginError && <div>{loginError.message}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  onSubmit(e) {
    e.preventDefault();
    let { email, password } = this.state;
    this.props.login(email, password);
    this.setState({
      email: '',
      password: ''
    });
  }
}

const mapStateToProps = (state) => {
  console.log('state: ')
  console.log(state)
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
