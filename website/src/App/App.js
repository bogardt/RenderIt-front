import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from '../utils/history';
import { Link } from 'react-router-dom';

import Register from '../Components/Register';
import Login from '../Components/Login';
import NavbarFeatures from '../Components/NavbarFeatures';

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
        <NavbarFeatures/>
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
