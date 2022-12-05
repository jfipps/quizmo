import React, { useEffect, useState, useContext } from "react";
import { QuizmoContext } from "../context";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../css/login.css";

export default function LoginNav() {
  const { test, setTest } = useContext(QuizmoContext);

  // Test function to get info from server.
  // const APICall = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5001/login", {
  //       method: "GET",
  //       mode: "cors",
  //     });
  //     const data = await response.json();
  //     setTest(data.msg);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   APICall();
  // }, []);
  return (
    <>
      <Navbar className="LoginNav">
        <Container>
          <h1 className="NavLink">Quizmo</h1>
          <h2 className="NavLink">Sign Up</h2>
        </Container>
      </Navbar>
    </>
  );
}
