import React, { useEffect, useState, useContext } from "react";
import { QuizmoContext } from "../../context";
import { useNavigate } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import "../../css/landing.css";

export default function LoginForm(props) {
  // context grab
  const {
    loginUsername,
    setLoginUsername,
    loginPassword,
    setLoginPassword,
    signUpUsername,
    setSignUpUsername,
    signUpPassword,
    setSignUpPassword,
    signUpEmail,
    setSignUpEmail,
    LoginCall,
    FetchUserAuth,
    AccountCreateCall,
  } = useContext(QuizmoContext);

  const navigate = useNavigate();

  // login form submit function
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const data = await LoginCall(loginUsername, loginPassword);
    if (data.user) {
      FetchUserAuth();
      navigate("/home");
    } else {
      navigate("/");
    }
    setLoginUsername("");
    setLoginPassword("");
  };

  // sign up form submit function
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    AccountCreateCall(signUpUsername, signUpPassword, signUpEmail);
    setSignUpEmail("");
    setSignUpUsername("");
    setSignUpPassword("");
  };

  return (
    <>
      <section className="LoginSection">
        <input type="checkbox" id="chk" aria-hidden="true"></input>
        <div className="LoginForm">
          <form id="loginform" onSubmit={handleLoginSubmit}>
            <label for="chk">Login</label>
            <div className="Labels">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={loginUsername}
                onChange={(event) => {
                  setLoginUsername(event.target.value);
                }}
              />
            </div>
            <div className="Labels">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                }}
              />
            </div>
            <input
              className="SubmitButton"
              form="loginform"
              type="submit"
              value="Login"
            />
          </form>
        </div>
        <div className="SignUpForm">
          <form id="signupform" onSubmit={handleSignUpSubmit}>
            <label for="chk">Sign Up</label>
            <div className="Labels">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={(event) => {
                  setSignUpEmail(event.target.value);
                }}
              />
            </div>
            <div className="Labels">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={signUpUsername}
                onChange={(event) => {
                  setSignUpUsername(event.target.value);
                }}
              />
            </div>
            <div className="Labels">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(event) => {
                  setSignUpPassword(event.target.value);
                }}
              />
            </div>
            <div className="Labels">
              <input
                className="SignUpSubmitButton"
                form="signupform"
                type="submit"
                value="Sign Up"
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
