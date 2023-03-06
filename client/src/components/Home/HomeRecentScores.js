import React, { useState, useEffect, useContext } from "react";
import { QuizmoContext } from "../../context";

export default function HomeRecentScores() {
  const { loginUsername } = useContext(QuizmoContext);

  const [isLoading, setIsLoading] = useState(true);
  const [myScores, setMyScores] = useState();

  const GetRecentScores = async (username) => {
    const data = { username };
    console.log(data);
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
      <div className="RecentScoresModal">
        <h1>Recent Scores</h1>
        <div className="RecentScoresBox">
          <table className="RecentScoresTable">
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Difficulty</th>
              <th>Score</th>
            </tr>
            {!isLoading &&
              myScores.map((score, index) => {
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
          </table>
        </div>
      </div>
    </section>
  );
}
