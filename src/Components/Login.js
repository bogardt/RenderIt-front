import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../Reducers/login';
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
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <form className="form-signin" name="Login" onSubmit={this.onSubmit}>
                  <div className="form-label-group">
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus onChange={e => this.setState({ email: e.target.value })} value={email} />
                    <label htmlFor="inputEmail">Email address</label>
                  </div>

                  <div className="form-label-group">
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required onChange={e => this.setState({ password: e.target.value })} value={password} />
                    <label htmlFor="inputPassword">Password</label>
                  </div>

                  <div className="custom-control custom-checkbox mb-3">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                  </div>

                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                  <button className="btn btn-lg btn-primary btn-block text-uppercase" to="/register">Sign up</button>
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

    )
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

