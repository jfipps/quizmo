import React, { useState, useEffect, useContext } from "react";
import { QuizmoContext } from "../../context";
import { useNavigate } from "react-router-dom";
import "../../css/quiz.css";

export default function QuizQuestions({ category, difficulty }) {
  // context grab
  const { username, WriteScore } = useContext(QuizmoContext);

  // states
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const navigate = useNavigate();

  // grabs questions from backend via api call
  const getQuestions = async (category, difficulty) => {
    const bodyData = { category, difficulty };
    await fetch("http://localhost:5001/quizquestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    }).then((res) => {
      res.json().then((data) => {
        setQuestions(data);
        setIsLoading(false);
      });
    });
  };

  // checks answer to see if correct on click
  // loads next question from array if not at end
  // if at end, submits score to DB under user's username
  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      console.log(questions[currentQuestion]);
    } else {
      console.log("Score ", score);
      setIsPlaying(false);
    }
  };

  // init call to get questions from backend
  useEffect(() => {
    getQuestions(category, difficulty);
  }, []);

  // sets available answers into one array and randomizes order
  useEffect(() => {
    if (questions) {
      setAnswers(
        questions[currentQuestion].answers
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      );
    }
  }, [questions, currentQuestion]);

  // sends final score to DB when done
  useEffect(() => {
    if (!isPlaying) {
      WriteScore(username, category, difficulty, score);
    }
  }, [isPlaying]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <section className="QuizQuestion">
        {isPlaying ? (
          <div className="Question">
            <h3>{questions[currentQuestion].question}</h3>
            <div className="AnswerButtons">
              {answers.map((answer, index) => {
                return (
                  <button
                    onClick={() => handleAnswerButtonClick(answer.isCorrect)}
                    key={index}
                    className="AnswerButton"
                  >
                    {answer.answer}
                  </button>
                );
              })}
            </div>
            <h4 className="ProgressTracker">
              {currentQuestion + 1} / {questions.length}
            </h4>
          </div>
        ) : (
          <>
            <div>You scored {score}/10</div>
            <button onClick={() => navigate("/")}>Home</button>
          </>
        )}
      </section>
    );
  }
}
