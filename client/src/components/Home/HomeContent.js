import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import HomeQuizStart from "./HomeQuizStart";
import HomeRecentScores from "./HomeRecentScores";
import "../../css/home.css";

export default function HomeContent(props) {
  return (
    <>
      <HomeQuizStart></HomeQuizStart>
      <HomeRecentScores></HomeRecentScores>
    </>
  );
}
