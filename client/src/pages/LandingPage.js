import React, { useEffect, useState, useContext } from "react";
import LandingDesc from "../components/LandingDesc";
import LoginModal from "../components/LoginModal";

export default function LandingPage() {
  return (
    <section className="LandingPage">
      <LandingDesc></LandingDesc>
      <LoginModal></LoginModal>
    </section>
  );
}
