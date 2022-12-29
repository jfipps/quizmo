import React, { useEffect, useState, useContext } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { QuizmoContext } from "../../context";
import "../../css/landing.css";

export default function LoginModal(props) {
  // state values
  const [selection, setSelection] = useState("login");

  return (
    <section className="LoginModal">
      <div className="LoginBox">
        <div className="Selection">
          <button
            className="SelectionButton"
            onClick={() => setSelection("login")}
          >
            Login
          </button>
          <button
            className="SelectionButton"
            onClick={() => setSelection("signup")}
          >
            Sign Up
          </button>
        </div>
        {selection === "login" ? (
          <LoginForm></LoginForm>
        ) : (
          <SignUpForm></SignUpForm>
        )}
      </div>
    </section>
  );
}
