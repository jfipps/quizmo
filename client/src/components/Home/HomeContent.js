import React, { useState, useEffect, useContext } from "react";
import "../../css/home.css";

export default function HomeContent(props) {
  const [category, setCategory] = useState("arts_and_literature");

  const HandleSubmit = (e) => {
    e.preventDefault();
    console.log(category);
  };

  return (
    <section className="HomeContent">
      <form onSubmit={HandleSubmit}>
        <label>
          Category:
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="arts_and_literature">Arts and Literature</option>
            <option value="film_and_tv">Film and TV</option>
            <option value="film_and_drink">Food and Drink</option>
            <option value="general_knowledge">General Knowledge</option>
            <option value="geography">Geography</option>
            <option value="history">History</option>
            <option value="music">Music</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </section>
  );
}
