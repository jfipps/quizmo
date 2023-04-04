import React, { useState, useEffect, useContext } from "react";
import HomeNav from "../components/Home/HomeNav";
import AboutContent from "../components/About/AboutContent";
import Loader from "../components/Loader";
import { QuizmoContext } from "../context";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "../css/about.css";

export default function AboutPage() {
  const { setLoginUsername } = useContext(QuizmoContext);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState();

  const navigate = useNavigate();

  // checks if user is logged in when page loads
  const CheckAuth = async () => {
    await fetch("http://localhost:5001/isAuth", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          setLoggedIn(data.loggedIn);
          if (data.loggedIn) {
            setLoginUsername(data.user.username);
          }
          setIsLoading(false);
        });
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    CheckAuth();
  }, []);

  // loads home page if user session available, returns to login if not
  if (isLoading) {
    return <Loader></Loader>;
  }
  if (loggedIn) {
    return (
      <>
        <HomeNav></HomeNav>
        <AboutContent></AboutContent>
      </>
    );
  } else {
    console.log("User session is not available");
    return <Navigate replace to="/login" />;
  }
}
