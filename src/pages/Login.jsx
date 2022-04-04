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

    const handleChange = async (e) => {
        setState({
            [e.target.name]: e.target.value
        });
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
            <div>
                <form
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <h1>
                        Login to
                        <Link to="/">
                            Chatty
                        </Link>
                    </h1>
                    <p>
                        Fill in the form below to login to your account.
                    </p>
                    <div>
                        <input
                            placeholder="Email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            value={state.email}
                        />
                    </div>
                    <div>
                        <input
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={state.password}
                            type="password"
                        />
                    </div>
                    <div>
                        {state.error ? (
                            <p>{state.error}</p>
                        ) : null}
                        <button type="submit">Login</button>
                    </div>
                    <hr />
                    <p>
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                    <button type="button" onClick={githubSignIn}>Sign up with GitHub</button>
          <p>Or</p>
                    <button onClick={googleSignIn} type="button">
                        Sign up with Google
                    </button>
                </form>
            </div>
        );
     }
    }
export default Login;