import React, { useEffect, useState, useContext } from "react";
import LandingDesc from "../components/Landing/LandingDesc";
import LandingNav from "../components/Landing/LandingNav";
import LoginModal from "../components/Landing/LoginModal";
import { QuizmoContext } from "../context";

export default function LandingPage() {
  const { FetchUserAuth } = useContext(QuizmoContext);

  return (
    <section className="LandingPage">
      <LandingNav></LandingNav>
      <div className="LandingContents">
        <LandingDesc></LandingDesc>
        <LoginModal></LoginModal>
      </div>
    </section>
  );
}
