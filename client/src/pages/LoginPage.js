import React, { useEffect, useState, useContext } from "react";
import LoginNav from "../components/LoginNav";
import LoginModal from "../components/LoginModal";

function LoginPage() {
  return (
    <section className="LoginLanding">
      <LoginNav></LoginNav>
      <LoginModal></LoginModal>
    </section>
  );
}

export default LoginPage;
