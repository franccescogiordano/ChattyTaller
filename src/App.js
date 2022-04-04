import React, { Component } from 'react';
import {
	Route,
	BrowserRouter as Router,
	Routes,
	Navigate,
	Outlet,
} from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { auth } from './services/firebase';

function PublicOutlet({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Navigate to='/chat' />}
    />
  )
}

function PrivateOutlet({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Navigate to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

export default class  App extends Component () {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }
  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    })
  }

  render() {
  return this.state.loading === true ? <h2>Loading...</h2> : (
    <Router>
      <Routes>
        <Route exact path="/" component={Home}></Route>
        <PrivateOutlet path="/chat" authenticated={this.state.authenticated} component={Chat}></PrivateOutlet>
        <PublicOutlet path="/signup" authenticated={this.state.authenticated} component={Signup}></PublicOutlet>
        <PublicOutlet path="/login" authenticated={this.state.authenticated} component={Login}></PublicOutlet>
      </Routes>
    </Router>
  );
}
}
