import React, { useState, useEffect, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import HomeNav from "../components/Home/HomeNav";
import HighScoreModal from "../components/HighScores/HighScoreModal";
import Loader from "../components/Loader";
import { QuizmoContext } from "../context";
import "../css/highscores.css";

export default function HighScorePage() {
  const { setLoginUsername } = useContext(QuizmoContext);

  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState();

  // checks if user is logged in when page loads
  const CheckAuth = async () => {
    await fetch("http://localhost:5001/isAuth", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setLoggedIn(data.loggedIn);
        setLoginUsername(data.user.username);
        setIsLoading(false);
      });
    });
  };

  useEffect(() => {
    CheckAuth();
  }, []);

  if (isLoading) {
    return <Loader></Loader>;
  }
  if (loggedIn) {
    return (
      <section className="HighScoresPage">
        <HomeNav></HomeNav>
        <div className="HighScoreContents">
          <HighScoreModal></HighScoreModal>
        </div>
      </section>
    );
  } else {
    console.log("User session not available");
    return <Navigate replace to="/login" />;
  }
}
