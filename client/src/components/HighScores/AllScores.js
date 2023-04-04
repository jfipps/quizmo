import React, { useState, useEffect, useContext } from "react";
import Loader from "../Loader";
import { QuizmoContext } from "../../context";
import "../../css/highscores.css";

export default function MyScores() {
  const { loginUsername, setPages, currentPage } = useContext(QuizmoContext);

  const [isLoading, setIsLoading] = useState(true);
  const [allScores, setAllScores] = useState();
  const rowLimit = 10;

  const lastIndex = currentPage * rowLimit;
  const firstIndex = lastIndex - rowLimit;

  // function to grab scores from all users
  // from the database.
  // it will filter the data to only display
  // scores that match the page limits
  const getAllScores = async (username) => {
    const data = { username };
    await fetch("http://localhost:5001/getallscores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        res.json().then((data) => {
          setAllScores(data.slice(firstIndex, lastIndex));
          const tempPages = [];
          for (let i = 0; i < Math.ceil(data.length / rowLimit); i++) {
            tempPages.push(i);
          }
          setPages(tempPages);
          setIsLoading(false);
        });
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllScores(loginUsername);
  }, []);

  // grabs new scores when the page number changes.
  useEffect(() => {
    getAllScores(loginUsername);
  }, [currentPage]);

  if (isLoading) {
    return <Loader></Loader>;
  } else {
    return (
      <>
        {allScores ? (
          <div className="HighScoreTableContainer">
            <div className="HighScoreTableDiv">
              <div className="TableHeaderRow">
                <div className="HeaderCell TableCell">Date</div>
                <div className="HeaderCell TableCell">Category</div>
                <div className="HeaderCell TableCell">Difficulty</div>
                <div className="HeaderCell TableCell">Score</div>
                <div className="HeaderCell TableCell">Username</div>
              </div>
              {allScores.map((score, index) => {
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
                    <div className="TableCell">{score.username}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>No Scores</div>
        )}
      </>
    );
  }
}
