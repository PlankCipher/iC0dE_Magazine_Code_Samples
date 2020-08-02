import React, { Component } from 'react';
import Form from '../../components/Form/Form.js';
import InputField from '../../components/InputField/InputField.js';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Register.css';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
      <div className="register">
        <div className="avatar">
          <div className="avatar__icon">
            <FiUser className="avatar__icon__svg" strokeWidth="1" />
          </div>
        </div>
        <Form
          className="register__form"
          handleFormSubmit={this.handleFormSubmit}
          buttonText="Register"
        >
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
            type="email"
            placeholder="Email"
            icon={FiMail}
            name="email"
            value={this.state.email}
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
          <InputField
            type="password"
            placeholder="Confirm Password"
            icon={FiLock}
            name="confirmPassword"
            value={this.state.confirmPassword}
            handleInputChange={this.handleInputChange}
            required={true}
          />
        </Form>
        <Link to="/login" className="login_link">
          Login
        </Link>
      </div>
    );
  }
}

export default Register;
