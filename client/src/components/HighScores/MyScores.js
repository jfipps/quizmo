import React, { useState, useEffect, useContext } from "react";
import { QuizmoContext } from "../../context";
import "../../css/highscores.css";

export default function MyScores() {
  const { loginUsername, setPages } = useContext(QuizmoContext);

  const [isLoading, setIsLoading] = useState(true);
  const [myScores, setMyScores] = useState();
  const rowLimit = 10;

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
          setMyScores(data);
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

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {myScores ? (
          <div className="HighScoreTableContainer">
            {/* <table className="HighScoreTable">
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Score</th>
              </tr>
              {myScores.map((score, index) => {
                var quizDate = new Date(score.createdAt);
                return (
                  <tr key={index}>
                    <td>{quizDate.toLocaleDateString()}</td>
                    <td>{score.category}</td>
                    <td>{score.difficulty}</td>
                    <td>{score.score}/10</td>
                  </tr>
                );
              })}
            </table> */}
            <div className="HighScoreTableDiv">
              <div className="TableHeaderRow">
                <div className="HeaderCell TableCell">Date</div>
                <div className="HeaderCell TableCell">Category</div>
                <div className="HeaderCell TableCell">Difficulty</div>
                <div className="HeaderCell TableCell">Score</div>
              </div>
              {myScores.map((score, index) => {
                var quizDate = new Date(score.createdAt);
                return (
                  <div className="TableScoreRow" key={index}>
                    <div className="TableCell">
                      {quizDate.toLocaleDateString()}
                    </div>
                    <div className="TableCell">{score.category}</div>
                    <div className="TableCell">{score.difficulty}</div>
                    <div className="TableCell">{score.score}/10</div>
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
