import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home/Home.js';
import Login from '../../pages/Login/Login.js';
import Register from '../../pages/Register/Register.js';
import Error404 from '../../pages/Error404/Error404.js';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="*" component={Error404} />
      </Switch>
    );
  }
}

export default App;
