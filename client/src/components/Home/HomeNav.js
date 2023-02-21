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

  return (
    <>
      <input type="checkbox" id="chk" aria-hidden="true"></input>
      <div className="MenuOverlay">
        <button>High Scores</button>
        <button>Friends</button>
        <button>About</button>
        <button onClick={() => HandleLogout()}>Logout</button>
      </div>
      <div className="MenuNavbar">
        <label className="Open" for="chk">
          <GiHamburgerMenu
            size={32}
            className="MenuButton"
            color={menuOpen ? "white" : "black"}
            onClick={() => setMenuOpen(!menuOpen)}
          ></GiHamburgerMenu>
        </label>
      </div>
    </>
  );
}
