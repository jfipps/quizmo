import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import HomeQuizStart from "./HomeQuizStart";
import HomeRecentScores from "./HomeRecentScores";
import "../../css/home.css";

export default function HomeContent(props) {
  return (
    <>
      <HomeRecentScores></HomeRecentScores>
      <HomeQuizStart></HomeQuizStart>
    </>
  );
  // const [category, setCategory] = useState("arts_and_literature");
  // const [difficulty, setDifficulty] = useState("easy");

  // const navigate = useNavigate();

  // // gathers user choice for quiz topic and difficulty
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(category + difficulty);
  //   navigate(`/quiz/${category}/${difficulty}`);
  // };

  // return (
  //   <section className="HomeContent">
  //     <form onSubmit={handleSubmit}>
  //       <label>
  //         Category:
  //         <select
  //           value={category}
  //           onChange={(event) => setCategory(event.target.value)}
  //         >
  //           <option value="arts_and_literature">Arts and Literature</option>
  //           <option value="film_and_tv">Film and TV</option>
  //           <option value="film_and_drink">Food and Drink</option>
  //           <option value="general_knowledge">General Knowledge</option>
  //           <option value="geography">Geography</option>
  //           <option value="history">History</option>
  //           <option value="music">Music</option>
  //           <option value="science">Science</option>
  //           <option value="society_and_culture">Society and Culture</option>
  //           <option value="sport_and_leisure">Sports and Leisure</option>
  //         </select>
  //       </label>
  //       <label>
  //         Difficulty
  //         <select
  //           value={difficulty}
  //           onChange={(event) => setDifficulty(event.target.value)}
  //         >
  //           <option value="easy">Easy</option>
  //           <option value="medium">Medium</option>
  //           <option value="hard">Hard</option>
  //         </select>
  //       </label>
  //       <input type="submit" value="Start!" />
  //     </form>
  //   </section>
  // );
}
