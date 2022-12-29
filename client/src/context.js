import React, { useEffect, useState } from "react";

const QuizmoContext = React.createContext();

const QuizmoProvider = ({ children }) => {
  // state values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [userSession, setUserSession] = useState();

  // functions
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

  const LoginCall = async (username, password) => {
    const data = { username, password };
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  };

  const FetchUserAuth = async () => {
    try {
      setLoading(true);
      const res = await fetch("/isAuth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        console.log("Not Found");
        return setLoading(false);
      }
      setUserSession(await res.json());
      console.log(userSession);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error("There was an error fetching authentication", e);
      return;
    }
  };

  const LogoutUser = async () => {
    const res = await fetch("/users/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  };

  // onLoads
  useEffect(() => {
    FetchUserAuth();
  }, []);

  return (
    <QuizmoContext.Provider
      value={{
        username,
        setUsername,
        password,
        setPassword,
        email,
        setEmail,
        AccountCreateCall,
        LoginCall,
        loading,
        setLoading,
        userSession,
        setUserSession,
        FetchUserAuth,
        LogoutUser,
      }}
    >
      {children}
    </QuizmoContext.Provider>
  );
};

export { QuizmoContext, QuizmoProvider };
