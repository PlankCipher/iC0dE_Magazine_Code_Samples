import React, { Component } from 'react';
import Form from '../../components/Form/Form';
import InputField from '../../components/InputField/InputField';
import { FiUser, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('FORM SUBMITTED');
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

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
      <div className="login">
        <div className="avatar">
          <div className="avatar__icon">
            <FiUser className="avatar__icon__svg" strokeWidth="1" />
          </div>
        </div>
        <Form handleFormSubmit={this.handleFormSubmit} buttonText="Login">
          <InputField
            type="text"
            placeholder="Username"
            icon={FiUser}
            name="username"
            value={this.state.username}
            handleInputChange={this.handleInputChange}
            required={true}
          />
          <InputField
            type="password"
            placeholder="Password"
            icon={FiLock}
            name="password"
            value={this.state.password}
            handleInputChange={this.handleInputChange}
            required={true}
          />
        </Form>
        <Link to="/register" className="register_link">
          Create an account
        </Link>
      </div>
    );
  }
}

export default Login;
