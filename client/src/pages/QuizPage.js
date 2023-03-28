import React, { useState, useEffect, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import QuizQuestions from "../components/Quiz/QuizQuestions";
import HomeNav from "../components/Home/HomeNav";
import Loader from "../components/Loader";
import "../css/quiz.css";

function HomePage(props) {
  const { category, difficulty } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState();

  // checks if user is logged in when page loads
  const CheckAuth = async () => {
    await fetch("http://localhost:5001/isAuth", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setLoggedIn(data.loggedIn);
        setIsLoading(false);
      });
    });
  };

  useEffect(() => {
    CheckAuth();
  }, []);

  if (isLoading) {
    return <Loader></Loader>;
  }
  if (loggedIn) {
    return (
      <>
        <HomeNav></HomeNav>
        <QuizQuestions
          category={category}
          difficulty={difficulty}
        ></QuizQuestions>
      </>
    );
  } else {
    console.log("User session not available");
    return <Navigate replace to="/login" />;
  }
}

export default HomePage;
