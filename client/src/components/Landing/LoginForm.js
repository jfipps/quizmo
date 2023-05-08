import React, { useEffect, useState, useContext } from "react";
import { QuizmoContext } from "../../context";
import { useNavigate } from "react-router-dom";
import LoginOptions from "./LoginOptions";
import SignUpOptions from "./SignUpOptions";
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

  // states
  const [formSelect, setFormSelect] = useState(true);

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
        <div className="FormButtonContainer">
          <button
            className={formSelect ? "ActiveForm" : "FormSelectButton"}
            id="login"
            onClick={() => setFormSelect(true)}
          >
            <span>Login</span>
          </button>
          <button
            className={!formSelect ? "ActiveForm" : "FormSelectButton"}
            id="signup"
            onClick={() => setFormSelect(false)}
          >
            <span>Sign Up</span>
          </button>
        </div>
        {formSelect ? (
          <LoginOptions></LoginOptions>
        ) : (
          <SignUpOptions></SignUpOptions>
        )}
      </section>
    </>
  );
}
