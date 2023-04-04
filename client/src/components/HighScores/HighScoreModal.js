import React, { useState, useEffect, useContext } from "react";
import MyScores from "../HighScores/MyScores";
import AllScores from "../HighScores/AllScores";
import { QuizmoContext } from "../../context";
import "../../css/highscores.css";

export default function HighScoreModal() {
  const { pages, currentPage, setCurrentPage } = useContext(QuizmoContext);

  // local states
  const [scoreSelect, setScoreSelect] = useState(true);
  const [pageLimit, setPageLimit] = useState(5);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);

  // function for clicking on an
  // available page number in the list
  const pageClick = (page) => {
    setCurrentPage(page);
  };

  // function for all page navigation buttons
  const pageNavClick = (command) => {
    // previous page command
    // checks if already on the first page and sets
    // the page limits accordingly
    if (command === "prev") {
      if (currentPage - 1 < minPageLimit + 1) {
        if (minPageLimit - pageLimit > 0) {
          setMinPageLimit(minPageLimit - pageLimit);
        } else {
          setMinPageLimit(0);
        }
        if (maxPageLimit - pageLimit > pageLimit) {
          setMaxPageLimit(maxPageLimit - pageLimit);
        } else {
          setMaxPageLimit(5);
        }
      }
      if (currentPage - 1 !== 0) {
        setCurrentPage(currentPage - 1);
      }
    }
    // next page command
    // checks if already on the last page and sets
    // the page limits accordingly
    if (command === "next") {
      console.log(currentPage, maxPageLimit, minPageLimit, pages.length);
      if (currentPage + 1 > maxPageLimit && currentPage < pages.length) {
        setMaxPageLimit(maxPageLimit + pageLimit);
        setMinPageLimit(minPageLimit + pageLimit);
      }
      if (currentPage < pages.length) {
        setCurrentPage(currentPage + 1);
      }
    }
    // go to first page command
    // sets the currentPage to 1 and sets limits to their defaults
    if (command === "first") {
      setCurrentPage(1);
      setMaxPageLimit(5);
      setMinPageLimit(0);
    }
    // go to last page command
    // uses mod of last page number to set the maxPageLimit and
    // minPageLimit states
    if (command === "last") {
      if (currentPage !== pages.length) {
        setCurrentPage(pages.length);
        setMaxPageLimit(
          pages.length + (pageLimit - (pages.length % pageLimit))
        );
        setMinPageLimit(
          pages.length + (pageLimit - (pages.length % pageLimit)) - pageLimit
        );
      }
    }
  };

  return (
    <>
      <section className="HighScoresModal">
        <div className="ButtonContainer">
          <button
            className={scoreSelect ? "ActiveSelection" : "ScoreSelectButton"}
            id="myscores"
            onClick={() => {
              pageNavClick("first");
              setScoreSelect(true);
            }}
          >
            <span>My Scores</span>
          </button>
          <button
            className={!scoreSelect ? "ActiveSelection" : "ScoreSelectButton"}
            id="allscores"
            onClick={() => {
              setCurrentPage(1);
              setScoreSelect(false);
            }}
          >
            <span>All Scores</span>
          </button>
        </div>
        {scoreSelect ? <MyScores></MyScores> : <AllScores></AllScores>}
      </section>
      <ul className="PageSelect">
        <li className="PageLink" onClick={() => pageNavClick("first")}>
          &lt;&lt;
        </li>
        <li className="PageLink" onClick={() => pageNavClick("prev")}>
          &lt;
        </li>
        <div className="PageList">
          {pages.length > 0 ? (
            pages.map((page) => {
              if (page + 1 > minPageLimit && page < maxPageLimit) {
                return (
                  <li
                    className={
                      currentPage === page + 1 ? "PageLink Active" : "PageLink"
                    }
                    key={page}
                    onClick={() => pageClick(page + 1)}
                  >
                    {page + 1}
                  </li>
                );
              } else {
                return null;
              }
            })
          ) : (
            <li className="PageLink Active">Test</li>
          )}
        </div>
        <li className="PageLink" onClick={() => pageNavClick("next")}>
          &gt;
        </li>
        <li className="PageLink" onClick={() => pageNavClick("last")}>
          &gt;&gt;
        </li>
      </ul>
    </>
  );
}
