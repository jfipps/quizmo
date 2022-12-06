import React, { useEffect, useState, useContext } from "react";
import { QuizmoContext } from "../context";
import "../css/landing.css";

export default function LoginModal(props) {
  // context grab
  const { username, setUsername, password, setPassword, AccountCreateCall } =
    useContext(QuizmoContext);

  const HandleSubmit = (e) => {
    e.preventDefault();
    AccountCreateCall(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <section className="LoginModal">
      <div className="LoginBox">
        <div className="Selection">
          <button className="SelectionButton">Login</button>
          <button className="SelectionButton">Sign Up</button>
        </div>
        <form className="LoginForm" onSubmit={HandleSubmit}>
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
      </div>
    </section>
  );
}
