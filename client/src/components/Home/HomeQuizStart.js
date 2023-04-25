import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/home.css";

export default function HomeQuizStart(props) {
  const [category, setCategory] = useState("none");
  const [difficulty, setDifficulty] = useState("none");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // gathers user choice for quiz topic and difficulty
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(category + difficulty);
    if (category === "none" || difficulty === "none") {
      setError(true);
    } else {
      navigate(`/quiz/${category}/${difficulty}`);
    }
  };

  return (
    <section className="QuizSelect">
      <div className="QuizSelectContainer">
        <h1>Take a Quiz!</h1>
        <form onSubmit={handleSubmit} className="QuizSelectForm">
          <label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="none">-- Category --</option>
              <option value="arts_and_literature">Arts and Literature</option>
              <option value="film_and_tv">Film and TV</option>
              <option value="film_and_drink">Food and Drink</option>
              <option value="general_knowledge">General Knowledge</option>
              <option value="geography">Geography</option>
              <option value="history">History</option>
              <option value="music">Music</option>
              <option value="science">Science</option>
              <option value="society_and_culture">Society and Culture</option>
              <option value="sport_and_leisure">Sports and Leisure</option>
            </select>
          </label>
          <label>
            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
            >
              <option value="none">-- Difficulty --</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <input type="submit" value="Start!" />
        </form>
        <h3 className={error ? "InError" : "NotInError"}>
          Please select a category and difficulty
        </h3>
      </div>
    </section>
  );
}
