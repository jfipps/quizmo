import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { QuizmoContext } from "../context";

function HomePage(props) {
  const { userSession } = useContext(QuizmoContext);

  if (!userSession) {
    return <Navigate replace to="/" />;
  } else {
    return <>Home Page</>;
  }
}

export default HomePage;
