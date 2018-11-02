import React from 'react';
import { Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login from './Login/Login';
import Register from './Register/Register';
import Home from './Home/Home';
import Messages from './Messages/Messages';
import Logout from './Logout/Logout';
import logo from '../img/logo.png';

const App = () => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/home">
        <img className="ri-navbar-logo" alt="logo" src={logo} />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/messages">
              Messages
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/logout">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Home} />
      <Route path="/messages" component={Messages} />
      <Route path="/logout" component={Logout} />
    </div>
    <ToastContainer />
  </div>
);

export default App;
