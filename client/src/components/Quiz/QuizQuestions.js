import React, { useState, useEffect, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import "../../css/home.css";

export default function QuizQuestions({ category, difficulty }) {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const getQuestions = async (category, difficulty) => {
    const data = { category, difficulty };
    await fetch("http://localhost:5001/quizquestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      res.json().then((data) => {
        setQuestions(data);
        setIsLoading(false);
      });
    });
  };

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    getQuestions(category, difficulty);
  }, []);

  useEffect(() => {
    if (questions) {
      setAnswers(
        questions[currentQuestion].answers
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      );
      console.log(questions);
    }
  }, [questions, currentQuestion]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {isPlaying ? (
          <div className="questions">
            <h3>{questions[currentQuestion].question}</h3>
            {answers.map((answer, index) => {
              return (
                <button
                  onClick={() => handleAnswerButtonClick(answer.isCorrect)}
                  key={index}
                >
                  {answer.answer}
                </button>
              );
            })}
          </div>
        ) : (
          <div>You scored {score}/10</div>
        )}
      </>
    );
  }
}
