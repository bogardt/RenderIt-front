import React from 'react'
import { Link, browserHistory } from 'react-router'
import './App.css';

export default function App({ children }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand">Render it project</Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div style={{ marginTop: '1.5em' }}>{children}</div>

      {/* For none component dom attributes */}
      {/* <button onClick={() => browserHistory.push('/login')}>/login</button> */}
    </div>
  )
}