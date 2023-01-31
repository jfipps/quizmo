import React, { useState, useEffect, useContext } from "react";
import { QuizmoContext } from "../../context";

export default function MyScores() {
  const { username } = useContext(QuizmoContext);

  const [isLoading, setIsLoading] = useState(true);
  const [myScores, setMyScores] = useState();

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
          setIsLoading(false);
        });
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getMyScores(username);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {myScores ? (
          <div>
            {myScores.map((score, index) => {
              return (
                <article key={index}>
                  {score.username} - {score.category} - {score.difficulty} -{" "}
                  {score.score}/10
                </article>
              );
            })}
          </div>
        ) : (
          <div>No Scores</div>
        )}
      </>
    );
  }
}
