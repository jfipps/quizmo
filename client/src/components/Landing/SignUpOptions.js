import React, { useEffect, useState, useContext } from "react";
import { QuizmoContext } from "../../context";
import { useNavigate } from "react-router-dom";
import "../../css/landing.css";

export default function SignUpOptions(props) {
  // context grab
  const {
    signUpUsername,
    setSignUpUsername,
    signUpPassword,
    setSignUpPassword,
    signUpEmail,
    setSignUpEmail,
    AccountCreateCall,
  } = useContext(QuizmoContext);

  const navigate = useNavigate();

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
      <div className="LoginForm">
        <form id="signupform" onSubmit={handleSignUpSubmit}>
          <label>Sign Up</label>
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
          <input
            className="SubmitButton"
            form="signupform"
            type="submit"
            value="Sign Up"
          />
        </form>
      </div>
    </>
  );
}
