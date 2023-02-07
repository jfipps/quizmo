import React, { useEffect, useState, useContext } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import QuizmoImage from "../../Resources/Quizmo.png";
import "../../css/landing.css";

export default function LoginModal(props) {
  return (
    <section className="LandingLeftSide">
      <div className="LoginBox">
        <LoginForm></LoginForm>
      </div>
    </section>
  );
}
