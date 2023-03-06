import React, { useEffect, useState, useContext } from "react";
import LoginDesc from "../components/Landing/LoginDesc";
import LoginNav from "../components/Landing/LoginNav";
import LoginModal from "../components/Landing/LoginModal";
import { QuizmoContext } from "../context";

export default function LandingPage() {
  return (
    <section className="LandingPage">
      <LoginModal></LoginModal>
      {/* <LoginDesc></LoginDesc> */}
    </section>
  );
}
