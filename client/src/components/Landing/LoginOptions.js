import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizmoContext } from "../../context";
import "../../css/landing.css";

export default function LoginOptions() {
  // context grab
  const {
    loginUsername,
    setLoginUsername,
    loginPassword,
    setLoginPassword,
    LoginCall,
    FetchUserAuth,
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
      alert("Invalid Username/Password. Please try again.");
    }
    setLoginUsername("");
    setLoginPassword("");
  };

  return (
    <div className="LoginForm">
      <form id="loginform" onSubmit={handleLoginSubmit}>
        <label>Login</label>
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
      {/* <span className="ResetPassword">
        Forgot password? Reset{" "}
        <span className="ResetLink" onClick={() => navigate("/resetpassword")}>
          here
        </span>
      </span> */}
    </div>
  );
}
