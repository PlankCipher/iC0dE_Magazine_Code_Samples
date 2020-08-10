import React, { Component } from 'react';
import { UsersContext } from '../../contexts/Users';
import { Redirect } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import './Home.css';

class Home extends Component {
  static contextType = UsersContext;

  render() {
    if (!this.context.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <>
        <NavBar />
        <div className="home">Welcome, {this.context.user.username}</div>
      </>
    );
  }
}

export default Home;
