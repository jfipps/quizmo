import React, { useEffect, useState } from "react";

const QuizmoContext = React.createContext();

const QuizmoProvider = ({ children }) => {
  // state values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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
      }}
    >
      {children}
    </QuizmoContext.Provider>
  );
};

export { QuizmoContext, QuizmoProvider };
