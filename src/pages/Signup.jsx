import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {  signInWithGoogle, signInWithGitHub } from "../helpers/auth";
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          email: '',
          password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.githubSignIn = this.githubSignIn.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
      }
      handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }

      async googleSignIn() {
        try {
          await signInWithGoogle();
        } catch (error) {
          this.setState({ error: error.message });
        }
      }
      async githubSignIn() {
        try {
          await signInWithGitHub();
        } catch (error) {
          this.setState({ error: error.message });
        }
      }

  render() {
    return (
        <>
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>
            Sign Up to
          <Link to="/">Chatty</Link>
          </h1>
          <p>Fill in the form below to create an account.</p>
          <div>
            <input placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
          </div>
          <div>
            <input placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
          </div>
          <div>
            {this.state.error ? <p>{this.state.error}</p> : null}
            <button type="submit">Sign up</button>
          </div>
          <hr></hr>
          <p>Already have an account? <Link to="/login">Login</Link></p>
          <button type="button" onClick={this.githubSignIn}>Sign up with GitHub</button>
          <p>Or</p>
                    <button onClick={this.googleSignIn} type="button">
                        Sign up with Google
                    </button>
        </form>

    </div>
    </>
    );
  }
}