import React, { useEffect, useState, useContext } from "react";
import LandingDesc from "../components/LandingDesc";
import LandingNav from "../components/LandingNav";
import LoginModal from "../components/LoginModal";
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
