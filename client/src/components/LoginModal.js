import React, { useEffect, useState } from "react";
import "../css/login.css";

export default function LoginModal(props) {
  return (
    <section className="LoginModal">
      <div className="LoginBox">
        <h1>Login</h1>
        <form className="LoginForm">
          <div className="Labels">
            <label>Username:</label>
            <input type="text" name="username" />
          </div>
          <div className="Labels">
            <label>Password:</label>
            <input type="text" name="password" />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </section>
  );
}
