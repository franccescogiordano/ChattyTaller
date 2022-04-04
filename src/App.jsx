import React, { useEffect, useState } from 'react';
import {
	Route,
	BrowserRouter as Router,
	Routes,
	Navigate
} from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';


function PublicOutlet({ authenticated, children }) {
  return (!authenticated ? children : <Navigate to='/chat' />);
}

function PrivateOutlet({ authenticated, children}) {
  return (
   authenticated ? children : <Navigate to='/login' />
  );
}

function App () {

  const [state, setState] = useState({
      authenticated: false,
      loading: true,
    });
  
  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      if (user) {
        setState({
          authenticated: true,
          loading: false,
        });
      } else {
        setState({
          authenticated: false,
          loading: false,
        });
      }
    })
  },[]);


  return state.loading === true ? (
		<h2>Loading...</h2>
	) : (
    <Router>
    

    <Routes>
      <Route path='/' element={<Home />} />
      <Route
        path='/chat'
        element={
          <PrivateOutlet authenticated={state.authenticated}>
            <Chat />
          </PrivateOutlet>
        }
      />

      <Route
        path='/signup'
        element={
          <PublicOutlet authenticated={state.authenticated}>
            <SignUp />
          </PublicOutlet>
        }
      />

      <Route
        path='/login'
        element={
          <PublicOutlet authenticated={state.authenticated}>
            <Login />
          </PublicOutlet>
        }
      />
    </Routes>
  </Router>
  	);
  
  }

export default App;
