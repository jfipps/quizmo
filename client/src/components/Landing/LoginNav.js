import React from "react";
import Container from "react-bootstrap/Container";
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import Navbar from "react-bootstrap/Navbar";

export default function LoginNav(props) {
  return (
    <>
      <Navbar className="Navbar">
        <Container>
          <Navbar.Brand href="/" className="Brand">
            Quizmo
          </Navbar.Brand>
          <div className="justify-content-end">
            <NavbarBrand href="/" className="NavLinks">
              About
            </NavbarBrand>
          </div>
        </Container>
      </Navbar>
    </>
  );
}
