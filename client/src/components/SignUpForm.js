import React, { useEffect, useState, useContext } from "react";
import { QuizmoContext } from "../context";
import "../css/landing.css";

export default function SignUpForm(props) {
  // context grab
  const {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    AccountCreateCall,
  } = useContext(QuizmoContext);

  const HandleSubmit = (e) => {
    e.preventDefault();
    AccountCreateCall(username, password, email);
    setUsername("");
    setPassword("");
  };

  return (
    <form className="LoginForm" onSubmit={HandleSubmit}>
      <div className="Labels">
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
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
