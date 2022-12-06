import React, { useEffect, useState } from "react";
import "../css/login.css";

export default function LoginModal(props) {
  // state values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const APICall = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/login?username=${username}&password=${password}`,
        {
          method: "GET",
          mode: "cors",
        }
      );
      const data = await response.json();
      console.log(data.msg);
    } catch (e) {
      console.log(e);
    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    APICall();
    setUsername("");
    setPassword("");
  };

  return (
    <section className="LoginModal">
      <div className="LoginBox">
        <h1 className="LoginTitle">Login</h1>
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
              type="text"
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
