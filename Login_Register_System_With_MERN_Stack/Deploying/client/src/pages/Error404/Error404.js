import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Error404.css';

class Error404 extends Component {
  componentDidMount() {
    document.querySelector('#root').style.display = 'flex';
    document.querySelector('#root').style.justifyContent = 'center';
    document.body.style.background =
      'linear-gradient(180deg, #cd71ed 0%, #08c290 100%) no-repeat';
  }

  componentWillUnmount() {
    document.querySelector('#root').style.display = 'block';
    document.body.style.background = '#fff';
  }

  render() {
    return (
      <div className="error404">
        <h1 className="heading">404 NOT FOUND</h1>
        <p className="text">Looks like you have lost your way</p>
        <Link to="/" className="back_home">
          How about going home?
        </Link>
      </div>
    );
  }
}

export default Error404;
