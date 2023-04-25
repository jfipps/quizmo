import React from "react";
import HashLoader from "react-spinners/HashLoader";
import "../css/loadingscores.css";

export default function ScoreLoader(props) {
  return (
    <section className="LoadingScoresTable">
      <HashLoader color="#fff" size="100"></HashLoader>
    </section>
  );
}
