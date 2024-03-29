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

  const CreateTable = () => {
    const tableArray = [];
    for (let index = 0; index < 10; index++) {
      if (myScores[index]) {
        var quizDate = new Date(myScores[index].createdAt);
        var category = myScores[index].category
          .replaceAll("_", " ")
          .split(" ")
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ");
        var difficulty =
          myScores[index].difficulty.charAt(0).toUpperCase() +
          myScores[index].difficulty.slice(1);
        tableArray.push(
          <div className="HomeTableScoreRow" key={index}>
            <div className="HomeTableCell">{quizDate.toLocaleDateString()}</div>
            <div className="HomeTableCell">{category}</div>
            <div className="HomeTableCell">{difficulty}</div>
            <div className="HomeTableCell">{myScores[index].score}/10</div>
          </div>
        );
      } else {
        tableArray.push(<div></div>);
      }
    }
    return tableArray;
  };

  return (
    <section className="RecentScores">
      <div className="RecentScoresContainer">
        <h1>Recent Scores</h1>
        <div className="RecentScoresBox">
          <div className="RecentScoresTable">
            <div
              className="HomeTableHeaderRow"
              onClick={() => {
                CreateTable();
              }}
            >
              <div className="HomeHeaderCell HomeTableCell">Date</div>
              <div className="HomeHeaderCell HomeTableCell">Category</div>
              <div className="HomeHeaderCell HomeTableCell">Difficulty</div>
              <div className="HomeHeaderCell HomeTableCell">Score</div>
            </div>
            {!isLoading && CreateTable()}
          </div>
        </div>
      </div>
    </section>
  );
}

// myScores.map((score, index) => {
//   var quizDate = new Date(score.createdAt);
//   var category = score.category
//     .replaceAll("_", " ")
//     .split(" ")
//     .map((word) => {
//       return word.charAt(0).toUpperCase() + word.slice(1);
//     })
//     .join(" ");
//   var difficulty =
//     score.difficulty.charAt(0).toUpperCase() + score.difficulty.slice(1);
//   return (
//     <div className="HomeTableScoreRow" key={index}>
//       <div className="HomeTableCell">{quizDate.toLocaleDateString()}</div>
//       <div className="HomeTableCell">{category}</div>
//       <div className="HomeTableCell">{difficulty}</div>
//       <div className="HomeTableCell">{score.score}/10</div>
//     </div>
//   );
// });
