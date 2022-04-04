import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup  } from '../helpers/auth';

function SignUp () {
     const [state, setState] = useState({
            error: null,
            email: "",
            password: ""
    });
      
    const handleSubmit = async (e) => {
      e.preventDefault();
      setState({ error: null });
  
      try {
        await signup(state.email, state.password);
      } catch (e) {
        setState({ error: e.message });
      }
    };

    return ( <div className="divhome">
    <form className="form-group" onSubmit={handleSubmit}>
          <h1>
            Sign Up to
          <Link to="/">Chatty</Link>
          </h1>
          <p>Fill in the form below to create an account.</p>
          <div className="form-group">
            <input  className="form-control" placeholder="Email" name="email" type="email" 	onChange={(e) => setState({...state,email : e.target.value})} value={state.email}></input>
          </div>
          <div className="form-group">
            <input  className="form-control" placeholder="Password" name="password" onChange={(e) => setState({...state,password : e.target.value})} value={state.password} type="password"></input>
          </div>
          <div className="form-group">
            {state.error ? <p>{state.error}</p> : null}
            <button  className="btn btn-primary" type="submit">Sign up</button>
          </div>
          <hr></hr>
          <p className="mb-0" >Already have an account? <Link to="/login">Login</Link></p>
         
        </form>

    </div>
    
    );
  }
  export default SignUp;