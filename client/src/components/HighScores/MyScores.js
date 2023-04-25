import React, { useState, useEffect, useContext } from "react";
import ScoresLoader from "../ScoresLoader";
import { QuizmoContext } from "../../context";
import "../../css/highscores.css";

export default function MyScores() {
  const { loginUsername, setPages, currentPage } = useContext(QuizmoContext);

  const [isLoading, setIsLoading] = useState(true);
  const [myScores, setMyScores] = useState();
  const [allMyScores, setAllMyScores] = useState();
  const rowLimit = 10;

  const lastIndex = currentPage * rowLimit;
  const firstIndex = lastIndex - rowLimit;

  // function to grab scores from current user
  // from the database.
  // it will filter the data to only display
  // scores that match the page limits
  const getMyScores = async (username) => {
    const data = { username };
    await fetch("http://localhost:5001/getmyscores", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        res.json().then((data) => {
          setAllMyScores(data);
          setMyScores(data.slice(firstIndex, lastIndex));
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
    getMyScores(loginUsername);
  }, []);

  // grabs scores when page number changes
  useEffect(() => {
    getMyScores(loginUsername);
  }, [currentPage]);

  if (isLoading) {
    return <ScoresLoader></ScoresLoader>;
  } else {
    return (
      <>
        {myScores ? (
          <>
            <div className="HighScoreTableContainer Paginated">
              <div className="HighScoreTableDiv">
                <div className="TableHeaderRow">
                  <div className="HeaderCell TableCell">Date</div>
                  <div className="HeaderCell TableCell">Category</div>
                  <div className="HeaderCell TableCell">Difficulty</div>
                  <div className="HeaderCell TableCell">Score</div>
                  <div className="HeaderCell TableCell">Username</div>
                </div>
                {myScores.map((score, index) => {
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
            <div className="HighScoreTableContainer All">
              <div className="HighScoreTableDiv">
                <div className="TableHeaderRow">
                  <div className="HeaderCell TableCell">Date</div>
                  <div className="HeaderCell TableCell">Category</div>
                  <div className="HeaderCell TableCell">Difficulty</div>
                  <div className="HeaderCell TableCell">Score</div>
                  <div className="HeaderCell TableCell">Username</div>
                </div>
                {allMyScores.map((score, index) => {
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
          </>
        ) : (
          <div>No Scores</div>
        )}
      </>
    );
  }
}
