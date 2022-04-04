import React, { Component,useState } from "react";
import { Link } from "react-router-dom";
import { signin } from "../helpers/auth";
import {  signInWithGoogle, signInWithGitHub } from "../helpers/auth";
function Login() {

    const [state, setState] = useState({
            error: null,
            email: "",
            password: ""
    });
      
  
    const googleSignIn = async() => {
        try {
          await signInWithGoogle();
        } catch (error) {
          setState({ error: error.message });
        }
      }
      const githubSignIn = async() => {
        try {
          await signInWithGitHub();
        } catch (error) {
          setState({ error: error.message });
        }
    }
  

    const handleSubmit =  async (e) =>{
        e.preventDefault();
        setState({ error: "" });
        try {
            await signin(state.email, state.password);
        } catch (error) {
            setState({ error: error.message });
        }
    }
    


        return (
            <div className="divhome">
                <form  className="form-group" autoComplete="off" onSubmit={handleSubmit} >
                    <h1>
                        Login to
                        <Link to="/">
                            Chatty
                        </Link>
                    </h1>
                    <p className="mb-0"> 
                        Fill in the form below to login to your account.
                    </p>
                    <div className="form-group">
                        <input className="form-control"
                            placeholder="Email"
                            name="email"
                            type="email"
                            onChange={(e) => setState({...state,email : e.target.value})}
                            value={state.email}
                        />
                    </div>
                    <div className="form-group">
                        <input
                        className="form-control"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => setState({...state,password : e.target.value})}
                            value={state.password}
                            type="password"
                        />
                    </div>
                    <div className="form-group">
                        {state.error ? (
                            <p>{state.error}</p>
                        ) : null}
                        <button className="btn btn-primary" type="submit">Login</button>
                    </div>
                    <hr />
                    <p className="lead">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                    <button className="btn btn-primary" type="button" onClick={githubSignIn}>Sign up with GitHub</button>
          <p className="mb-0">Or</p>
                    <button className="btn btn-primary" onClick={googleSignIn} type="button">
                        Sign up with Google
                    </button>
                </form>
            </div>
        );
     
    }
export default Login;