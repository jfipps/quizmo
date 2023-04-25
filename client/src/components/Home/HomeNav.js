import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizmoContext } from "../../context";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import "../../css/home.css";

export default function HomeNav() {
  const { LogoutUser } = useContext(QuizmoContext);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // function to send user to high scores page
  const HandleHighScore = async () => {
    navigate("/highscores");
  };

  // function to send the user to the about page
  const HandleAbout = async () => {
    navigate("/about");
  };

  // go home function

  const HandleHome = () => {
    navigate("/");
  };

  return (
    <>
      <input type="checkbox" id="chk" aria-hidden="true"></input>
      <div className="MenuOverlay">
        <button onClick={() => HandleHighScore()}>High Scores</button>
        <button onClick={() => HandleAbout()}>About</button>
        <button onClick={() => HandleLogout()}>Logout</button>
      </div>
      <div className="HomeNav">
        <div className="HomeNavbar" onClick={() => HandleHome()}>
          <h1>Quizmo</h1>
        </div>
        <div className="MenuNavbar">
          <label className="Open" for="chk">
            <GiHamburgerMenu
              size={32}
              className="MenuButton"
              color={menuOpen ? "white" : "white"}
              onClick={() => setMenuOpen(!menuOpen)}
            ></GiHamburgerMenu>
          </label>
        </div>
      </div>
    </>
  );
}
