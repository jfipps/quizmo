import React, { useState, useEffect, useContext } from "react";
import HomeNav from "../components/Home/HomeNav";
import HomeContent from "../components/Home/HomeContent";
import { Navigate } from "react-router-dom";
import { QuizmoContext } from "../context";

function HomePage(props) {
  const { userSession } = useContext(QuizmoContext);

  if (!userSession) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <section className="HomePage">
        <HomeNav></HomeNav>
        <div className="HomeContents">
          <HomeContent></HomeContent>
        </div>
      </section>
    );
  }
}

export default HomePage;
