import React, { useState, useEffect, useContext } from "react";
import { QuizmoContext } from "../../context";

export default function HomeRecentScores() {
  const { loginUsername } = useContext(QuizmoContext);

  const [isLoading, setIsLoading] = useState(true);
  const [myScores, setMyScores] = useState();

  // grabs up to 10 most recent scores
  // from the logged in user from the database
  const GetRecentScores = async (username) => {
    const data = { username };
    console.log(data);
    await fetch("http://localhost:5001/getmyrecentscores", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        res.json().then((data) => {
          setMyScores(data);
          setIsLoading(false);
          console.log(data);
        });
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  };

  useEffect(() => {
    GetRecentScores(loginUsername);
  }, []);

  return (
    <section className="RecentScores">
      <div className="RecentScoresContainer">
        <h1>Recent Scores</h1>
        <div className="RecentScoresBox">
          <div className="RecentScoresTable">
            <div className="TableHeaderRow">
              <div className="HeaderCell TableCell">Date</div>
              <div className="HeaderCell TableCell">Category</div>
              <div className="HeaderCell TableCell">Difficulty</div>
              <div className="HeaderCell TableCell">Score</div>
            </div>
            {!isLoading &&
              myScores.map((score, index) => {
                var quizDate = new Date(score.createdAt);
                var category = score.category
                  .replaceAll("_", " ")
                  .split(" ")
                  .map((word) => {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                  })
                  .join(" ");
                var difficulty =
                  score.difficulty.charAt(0).toUpperCase() +
                  score.difficulty.slice(1);
                return (
                  <div className="TableScoreRow" key={index}>
                    <div className="TableCell">
                      {quizDate.toLocaleDateString()}
                    </div>
                    <div className="TableCell">{category}</div>
                    <div className="TableCell">{difficulty}</div>
                    <div className="TableCell">{score.score}/10</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
