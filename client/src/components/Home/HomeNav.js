import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import Navbar from "react-bootstrap/Navbar";
import { QuizmoContext } from "../../context";

export default function HomeNav(props) {
  const { LogoutUser } = useContext(QuizmoContext);

  const navigate = useNavigate();

  // function to send user logout request to backend
  const HandleLogout = async () => {
    const data = await LogoutUser();
    if (data) {
      console.log("Logging Out");
      console.log(data);
      navigate("/login");
    } else {
      console.log("No session to logout");
      navigate("/login");
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
