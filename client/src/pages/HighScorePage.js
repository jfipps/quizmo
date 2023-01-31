import React, { useState, useEffect, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import MyScores from "../components/HighScores/MyScores";
import AllScores from "../components/HighScores/AllScores";

export default function HighScorePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState();
  const [scoreSelect, setScoreSelect] = useState(true);

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
        setIsLoading(false);
      });
    });
  };

  useEffect(() => {
    CheckAuth();
  }, []);

  if (isLoading) {
    console.log("Loading");
    return <div>Loading...</div>;
  }
  if (loggedIn) {
    return (
      <>
        <div>
          <button
            onClick={() => {
              setScoreSelect(true);
            }}
          >
            Mine
          </button>
          <button
            onClick={() => {
              setScoreSelect(false);
            }}
          >
            All
          </button>
        </div>
        {scoreSelect ? <MyScores></MyScores> : <AllScores></AllScores>}
      </>
    );
  } else {
    console.log("User session not available");
    return <Navigate replace to="/login" />;
  }

  return <div></div>;
}
