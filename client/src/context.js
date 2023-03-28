import React, { useEffect, useState } from "react";

const QuizmoContext = React.createContext();

const QuizmoProvider = ({ children }) => {
  // state values
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [userSession, setUserSession] = useState();
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // functions

  // accepts user input for account info
  // sends to backend to create in mongodb
  const AccountCreateCall = async (username, password, email) => {
    const data = { username, password, email };
    try {
      const response = await fetch(`http://localhost:5001/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return "Account Created";
    } catch (e) {
      return "Error creating account";
    }
  };

  // takes user entered username and password
  // send to backend to check and returns result
  const LoginCall = async (username, password) => {
    const data = { username, password };
    const res = await fetch("http://localhost:5001/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  };

  // helper function to check if user has an active session
  const FetchUserAuth = async () => {
    try {
      setLoading(true);
      await fetch("http://localhost:5001/isAuth", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (!res.ok) {
          console.log("Not Found");
          return setLoading(false);
        }
        res.json().then((data) => {
          setUserSession(data);
          console.log("User data");
          console.log(userSession);
        });
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error("There was an error fetching authentication", e);
      return;
    }
  };

  // function to delete current user session if there is one
  const LogoutUser = async () => {
    const res = await fetch("http://localhost:5001/users/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  };

  // function to write user score to DB
  const WriteScore = async (username, category, difficulty, score) => {
    const data = { username, category, difficulty, score };
    console.log(data);
    await fetch("http://localhost:5001/addscore", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <QuizmoContext.Provider
      value={{
        loginUsername,
        setLoginUsername,
        loginPassword,
        setLoginPassword,
        signUpUsername,
        setSignUpUsername,
        signUpPassword,
        setSignUpPassword,
        signUpEmail,
        setSignUpEmail,
        AccountCreateCall,
        LoginCall,
        loading,
        setLoading,
        userSession,
        setUserSession,
        FetchUserAuth,
        LogoutUser,
        WriteScore,
        pages,
        setPages,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </QuizmoContext.Provider>
  );
};

export { QuizmoContext, QuizmoProvider };
