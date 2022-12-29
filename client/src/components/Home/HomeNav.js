import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import Navbar from "react-bootstrap/Navbar";
import { QuizmoContext } from "../../context";

export default function HomeNav(props) {
  const { LogoutUser } = useContext(QuizmoContext);

  const navigate = useNavigate();

  const HandleLogout = async () => {
    const data = await LogoutUser();
    if (data) {
      console.log(data);
      navigate("/");
    } else {
      console.log("No session to logout");
      navigate("/");
    }
  };

  return (
    <>
      <Navbar className="Navbar">
        <Container>
          <Navbar.Brand href="/" className="Brand">
            Quizmo
          </Navbar.Brand>
          <div className="justify-content-end">
            <Navbar.Brand href="/" className="NavLinks">
              High Scores
            </Navbar.Brand>
            <NavbarBrand href="/" className="NavLinks">
              About
            </NavbarBrand>
            <NavbarBrand className="NavLinks" onClick={() => HandleLogout()}>
              Logout
            </NavbarBrand>
          </div>
        </Container>
      </Navbar>
    </>
  );
}
