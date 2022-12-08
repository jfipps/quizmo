import React, { useEffect, useState, useContext } from "react";
import { QuizmoContext } from "../context";
import "../css/landing.css";

export default function LoginForm(props) {
  // context grab
  const { username, setUsername, password, setPassword } =
    useContext(QuizmoContext);

  const HandleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    setUsername("");
    setPassword("");
  };

  return (
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
  );
}
