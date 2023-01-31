import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  UseNavigate,
  Navigate,
} from "react-router-dom";
import { QuizmoContext } from "../context";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import QuizPage from "../pages/QuizPage";
import HighScorePage from "../pages/HighScorePage";

export default function Paths() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/home" element={<HomePage></HomePage>}></Route>
        <Route
          path="/highscores"
          element={<HighScorePage></HighScorePage>}
        ></Route>
        <Route
          path="/quiz/:category/:difficulty"
          element={<QuizPage></QuizPage>}
        ></Route>
      </Routes>
    </>
  );
}
