import React, { Component } from 'react';

const UsersContext = React.createContext();
const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'PRODUCTION_URL'
    : 'http://localhost:5000';

class UsersContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      user: {},
      logUserIn: this.logUserIn,
      logUserOut: this.logUserOut,
      registerUser: this.registerUser,
    };
  }

  componentDidMount = async () => {
    const res = await fetch(`${API_URL}/api/users/currentUser`, {
      credentials: 'include',
    });
    const data = await res.json();

    const isLoggedIn = data.user ? true : false;
    const user = data.user ? data.user : {};
    this.setState({ isLoggedIn, user });
  };

  logUserIn = async (username, password) => {
    let title, text;

    const res = await fetch(`${API_URL}/api/users/login`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const { user, statusCode: responseStatus } = await res.json();

    if (responseStatus === 422) {
      title = 'Ooops!';
      text = 'Incorrect credentials.';
    } else if (responseStatus === 204) {
      this.setState({
        isLoggedIn: true,
        user,
      });

      title = 'Done';
      text = 'You will get redirected to home page.';
    } else {
      title = 'Ooops!';
      text = 'Something went wrong. Try again later.';
    }

    return { title, text };
  };

  registerUser = async (username, email, password, confirmPassword) => {
    let title, text;

    if (password.length < 8 || confirmPassword.length < 8) {
      title = 'Ooops!';
      text = 'Password must be longer than 8 chars.';
    } else if (password !== confirmPassword) {
      title = 'Ooops!';
      text = 'Password and Confirm Password must match.';
    } else {
      const res = await fetch(`${API_URL}/api/users/register`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      });

      const responseStatus = res.status;

      if (responseStatus === 409) {
        title = 'Ooops!';
        text = 'Username already taken.';
      } else if (responseStatus === 201) {
        title = 'Done';
        text = 'Your account was created.';
      } else {
        title = 'Ooops!';
        text = 'Something went wrong. Try again later.';
      }
    }

    return { title, text };
  };

  logUserOut = async () => {
    await fetch(`${API_URL}/api/users/logout`, {
      credentials: 'include',
      method: 'POST',
    });

    this.setState({ isLoggedIn: false, user: {} });
  };

  render() {
    return (
      <UsersContext.Provider value={this.state}>
        {this.props.children}
      </UsersContext.Provider>
    );
  }
}

export { UsersContext, UsersContextProvider };
