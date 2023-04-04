import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/about.css";

function AboutContent(props) {
  const navigate = useNavigate();
  return (
    <section className="AboutPage">
      <div className="AboutContainer">
        <div className="AboutContents">
          <h1>About</h1>
          <span>
            Quizmo is an quiz application used to test your knowledge and
            compare your scores against other users. When a quick is taken, the
            scores are written to the high score board for each user to see how
            the rank against others. This application uses a React frontend with
            a NodeJS backend, with MongoDB serving as the database solution.
          </span>
          <button
            className="HomeButton"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
        </div>
      </div>
    </section>
  );
}

export default AboutContent;
