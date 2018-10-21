import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../Components/Home';
import Register from '../Components/Register';
import Login from '../Components/Login';
import NavbarFeatures from '../Components/MaterialNavbar';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <NavbarFeatures />
            <Switch>
              <div>
                <Route path="/home" component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
              </div>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }

}

export default App;
