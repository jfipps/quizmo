import React, { useState, useEffect, useContext } from "react";
import HomeNav from "../components/Home/HomeNav";
import HomeContent from "../components/Home/HomeContent";
import { Navigate } from "react-router-dom";
import { QuizmoContext } from "../context";
import "../css/home.css";

function HomePage(props) {
  const { setLoginUsername } = useContext(QuizmoContext);
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
    console.log("Loading");
    return <div>Loading...</div>;
  }
  if (loggedIn) {
    return (
      <>
        <HomeNav></HomeNav>
        <section className="HomePage">
          <div className="HomeContents">
            <HomeContent></HomeContent>
          </div>
        </section>
      </>
    );
  } else {
    console.log("User session is not available");
    return <Navigate replace to="/login" />;
  }
}

export default HomePage;
