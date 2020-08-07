import React, { Component } from 'react';
import { UsersContext } from '../../contexts/Users';
import './NavBar.css';

class NavBar extends Component {
  static contextType = UsersContext;

  render() {
    return (
      <nav className="nav">
        <button
          className="nav__log_out_button"
          onClick={this.context.logUserOut}
        >
          Log out
        </button>
      </nav>
    );
  }
}

export default NavBar;
