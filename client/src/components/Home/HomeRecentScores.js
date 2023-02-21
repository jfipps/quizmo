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
      {!isLoading &&
        myScores.map((score, index) => {
          return (
            <article key={index}>
              {score.username} - {score.category} - {score.difficulty} -{" "}
              {score.score}/10
            </article>
          );
        })}
    </section>
  );
}
