import React, { useState, useEffect, useContext } from "react";
import { QuizmoContext } from "../../context";

export default function MyScores() {
  const { username } = useContext(QuizmoContext);

  const [isLoading, setIsLoading] = useState(true);
  const [allScores, setAllScores] = useState();

  const getMyScores = async (username) => {
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
          setAllScores(data);
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
        {allScores ? (
          <div>
            {allScores.map((score, index) => {
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
