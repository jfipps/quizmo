import React, { useEffect, useState, useContext } from "react";
import { QuizmoContext } from "../../context";
import { useNavigate } from "react-router-dom";
import "../../css/landing.css";

export default function LoginForm(props) {
  // context grab
  const {
    username,
    setUsername,
    password,
    setPassword,
    LoginCall,
    FetchUserAuth,
  } = useContext(QuizmoContext);

  const navigate = useNavigate();

  // form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await LoginCall(username, password);
    if (data.user) {
      FetchUserAuth();
      navigate("/home");
    } else {
      navigate("/");
    }
    setUsername("");
    setPassword("");
  };

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <div className="Labels">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </div>
      <div className="Labels">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
}
