import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from '../utils/history';
import { Link } from 'react-router-dom';

import Register from '../Components/Register';
import Login from '../Components/Login';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

import logo from '../logo.svg';
import './App.css';

class App extends Component {

  handleSubmit(e) {
    console.log('hande submit')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Router history={history}>
          <div>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <form name="form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <Link to="/login" className="btn btn-link">Login</Link>
                <Link to="/register" className="btn btn-link">Register</Link>
              </div>
            </form>
          </div>
        </Router>

      </div>
    );
  }

}

export default App;
